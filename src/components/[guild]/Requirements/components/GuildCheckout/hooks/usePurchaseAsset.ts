import { BigNumber, BigNumberish } from "@ethersproject/bignumber"
import { Contract } from "@ethersproject/contracts"
import { useWeb3React } from "@web3-react/core"
import useGuild from "components/[guild]/hooks/useGuild"
import useDatadog from "components/_app/Datadog/useDatadog"
import { Chains, RPC } from "connectors"
import useBalance from "hooks/useBalance"
import useContract from "hooks/useContract"
import useEstimateGasFee from "hooks/useEstimateGasFee"
import useShowErrorToast from "hooks/useShowErrorToast"
import useToast from "hooks/useToast"
import useTokenData from "hooks/useTokenData"
import { useMemo } from "react"
import {
  ADDRESS_REGEX,
  getTokenBuyerContractData,
} from "utils/guildCheckout/constants"
import {
  GeneratedGetAssetsParams,
  generateGetAssetsParams,
} from "utils/guildCheckout/utils"
import processWalletError from "utils/processWalletError"
import { useGuildCheckoutContext } from "../components/GuildCheckoutContex"
import useAllowance from "./useAllowance"
import usePrice from "./usePrice"
import useSubmitTransaction from "./useSubmitTransaction"

const isConfigParam = (
  param: any
): param is {
  value?: BigNumberish
  gasLimit?: BigNumberish
} => "value" in (param ?? {})

const purchaseAsset = async (
  tokenBuyerContract: Contract,
  generatedGetAssetsParams: GeneratedGetAssetsParams,
  estimatedGasLimit: BigNumber
) => {
  // We shouldn't run into these issues, but rejecting here in case something wrong happens.
  if (!tokenBuyerContract) return Promise.reject("Can't find TokenBuyer contract.")
  if (!generatedGetAssetsParams)
    return Promise.reject("Couldn't generate getAssets params.")

  // Adjusting the gas limit to avoid failing transactions)
  // TODO: rethink the way we use generateGetAssetsParams, maybe we can find a cleaner solution for adjusting gas fee here.
  const generatedGetAssetsParamsWithGasLimit = [...generatedGetAssetsParams]
  const customGasLimit = estimatedGasLimit?.mul(15)?.div(10)
  if (isConfigParam(generatedGetAssetsParamsWithGasLimit[4]))
    generatedGetAssetsParamsWithGasLimit[4].gasLimit = customGasLimit
  else if (isConfigParam(generatedGetAssetsParamsWithGasLimit[3]))
    generatedGetAssetsParamsWithGasLimit[3].gasLimit = customGasLimit

  try {
    await tokenBuyerContract.callStatic.getAssets(...generatedGetAssetsParams)
  } catch (callStaticError) {
    if (callStaticError.error) {
      const walletError = processWalletError(callStaticError.error)
      return Promise.reject(walletError.title)
    }

    if (!callStaticError.errorName) return Promise.reject(callStaticError)

    switch (callStaticError.errorName) {
      case "AccessDenied":
        return Promise.reject("TokenBuyer contract error: access denied")
      case "TransferFailed":
        return Promise.reject("TokenBuyer contract error: ERC20 transfer failed")
      default:
        return Promise.reject(callStaticError.errorName)
    }
  }

  return tokenBuyerContract.getAssets(...generatedGetAssetsParams)
}

const usePurchaseAsset = () => {
  const { addDatadogAction, addDatadogError } = useDatadog()

  const showErrorToast = useShowErrorToast()
  const toast = useToast()

  const { account, chainId } = useWeb3React()

  const { id: guildId } = useGuild()
  const { requirement, pickedCurrency } = useGuildCheckoutContext()
  const {
    data: { symbol },
  } = useTokenData(requirement.chain, requirement.address)
  const { data: priceData } = usePrice(pickedCurrency)

  const tokenBuyerContractData = getTokenBuyerContractData(guildId)
  const tokenBuyerContract = useContract(
    tokenBuyerContractData[Chains[chainId]]?.address,
    tokenBuyerContractData[Chains[chainId]]?.abi,
    true
  )

  const generatedGetAssetsParams = useMemo(
    () =>
      generateGetAssetsParams(guildId, account, chainId, pickedCurrency, priceData),
    [guildId, account, chainId, pickedCurrency, priceData]
  )

  const { allowance } = useAllowance(
    pickedCurrency,
    tokenBuyerContractData[Chains[chainId]]?.address
  )

  const { coinBalance, tokenBalance } = useBalance(
    pickedCurrency,
    Chains[requirement?.chain]
  )

  const pickedCurrencyIsNative =
    pickedCurrency === RPC[Chains[chainId]]?.nativeCurrency.symbol

  const isSufficientBalance =
    priceData?.priceInWei &&
    (coinBalance || tokenBalance) &&
    (pickedCurrencyIsNative
      ? coinBalance?.gt(BigNumber.from(priceData.priceInWei))
      : tokenBalance?.gt(BigNumber.from(priceData.priceInWei)))

  const shouldEstimateGas =
    requirement?.chain === Chains[chainId] &&
    priceData?.priceInWei &&
    isSufficientBalance &&
    (ADDRESS_REGEX.test(pickedCurrency)
      ? allowance && BigNumber.from(priceData.priceInWei).lte(allowance)
      : true)

  const {
    estimatedGasLimit,
    estimatedGasFee,
    estimatedGasFeeInUSD,
    estimateGasError,
  } = useEstimateGasFee(
    requirement?.id?.toString(),
    shouldEstimateGas ? tokenBuyerContract : null,
    "getAssets",
    generatedGetAssetsParams
  )

  const purchaseAssetTransaction = (data?: GeneratedGetAssetsParams) =>
    purchaseAsset(tokenBuyerContract, data, estimatedGasLimit)

  const useSubmitData = useSubmitTransaction<GeneratedGetAssetsParams>(
    purchaseAssetTransaction,
    {
      onError: (error) => {
        showErrorToast(error)
        addDatadogError("general purchase requirement error (GuildCheckout)")
        addDatadogError("purchase requirement pre-call error (GuildCheckout)", {
          error,
        })
      },
      onSuccess: (receipt) => {
        if (receipt.status !== 1) {
          showErrorToast("Transaction failed")
          addDatadogError("general purchase requirement error (GuildCheckout)")
          addDatadogError("purchase requirement error (GuildCheckout)", {
            receipt,
          })
          return
        }

        addDatadogAction("purchased requirement (GuildCheckout)")
        toast({
          status: "success",
          title: "Your new asset:",
          description: `${requirement.data.minAmount} ${symbol}`,
        })
      },
    }
  )

  return {
    ...useSubmitData,
    onSubmit: () => useSubmitData.onSubmit(generatedGetAssetsParams),
    estimatedGasFee,
    estimatedGasFeeInUSD,
    estimateGasError,
  }
}

export default usePurchaseAsset