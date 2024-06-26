import useSetRoleImageAndNameFromPlatformData from "components/[guild]/AddRewardButton/hooks/useSetRoleImageAndNameFromPlatformData"
import useNftDetails from "components/[guild]/collect/hooks/useNftDetails"
import { useWatch } from "react-hook-form"
import RewardPreview from "./RewardPreview"

const ContractCallPreview = ({ children }): JSX.Element => {
  const chain = useWatch({
    name: "rolePlatforms.0.guildPlatform.platformGuildData.chain",
  })
  const contractAddress = useWatch({
    name: "rolePlatforms.0.guildPlatform.platformGuildData.contractAddress",
  })
  const { name, image, isLoading } = useNftDetails(chain, contractAddress)

  useSetRoleImageAndNameFromPlatformData(image, name)

  return (
    <RewardPreview
      type="CONTRACT_CALL"
      isLoading={isLoading}
      name={name}
      image={image}
    >
      {children}
    </RewardPreview>
  )
}

export default ContractCallPreview
