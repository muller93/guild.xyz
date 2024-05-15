import { Schemas } from "@guildxyz/types"
import { FeatureFlag } from "components/[guild]/EditGuild/components/FeatureFlags"
import { ContractCallFunction } from "components/[guild]/RolePlatforms/components/AddRoleRewardModal/components/AddContractCallPanel/components/CreateNftForm/hooks/useCreateNft"
import { RequirementType } from "requirements"
import type { Chain, Chains } from "wagmiConfig/chains"

export const FUEL_ADDRESS_REGEX = /^0x[a-f0-9]{64}$/i

type Token = {
  address: `0x${string}`
  name: string
  symbol: string
  decimals: number
}

type DiscordError = { error: string; errorDescription: string }

type WalletError = { code: number; message: string }

type Rest = {
  [x: string]: any
}

type Logic = "AND" | "OR" | "ANY_OF"

type Theme = {
  color?: string
  backgroundImage?: string
  backgroundCss?: string
}

type CoingeckoToken = {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

type Poap = {
  id: number
  fancy_id: string
  name: string
  event_url?: string
  image_url: string
  country?: string
  city?: string
  description?: string
  year: number
  start_date: string
  end_date: string
  expiry_date: string
  from_admin: boolean
  virtual_event: boolean
  event_template_id: number
  event_host_id: number
}

type GitPoap = {
  gitPoapEventId: number
  poapEventId: number
  poapEventFancyId: string
  name: string
  year: number
  description: string
  imageUrl: string
  repositories: string[]
  mintedCount: number
}

type NFT = {
  name: string
  type: string
  address: string
  logoUri: string
  slug: string
}

type PlatformName =
  | "TELEGRAM"
  | "DISCORD"
  | "GITHUB"
  | "TWITTER"
  | "GOOGLE"
  | "POAP"
  | "CONTRACT_CALL"
  | "TWITTER_V1"
  | "EMAIL"
  | "UNIQUE_TEXT"
  | "TEXT"
  | "POLYGON_ID"
  | "POINTS"
  | "FORM"
  | "GATHER_TOWN"
  | "ERC20"

type PlatformUserData = {
  acessToken?: string
  scope?: string
  expiresIn?: number
  invalidToken?: boolean
  refreshToken?: string
  avatar?: string
  username?: string
  readonly?: boolean
}
type PlatformAccountDetails = {
  platformId: number
  platformName: PlatformName
  platformUserId: string
  platformUserData?: PlatformUserData
  username?: string
}

type SharedSocial = {
  guildId: number
  isShared: boolean
}

type UserAddress = {
  address: `0x${string}`
  userId: number
  isPrimary: boolean
  isDelegated: boolean
  createdAt: string
  walletType: "EVM" | "FUEL"
}

type User = {
  id: number
  addresses: UserAddress[]
  platformUsers: PlatformAccountDetails[]
  sharedSocials: SharedSocial[]
  publicKey?: string
  isSuperAdmin: boolean

  captchaVerifiedSince: Date

  emails: {
    emailAddress: string
    pending: boolean
    createdAt: Date
  }
}

type BaseUser = {
  id: number
  createdAt: Date
}

type GuildBase = {
  id: number
  name: string
  urlName: string
  imageUrl: string
  memberCount: number
  rolesCount: number
  tags: Array<GuildTags>
  hideFromExplorer: boolean
  isAdmin?: boolean
  isOwner?: boolean
}

type GuildPinConfig = {
  chain: Chain | "FUEL"
  isActive: boolean
}

type SimpleGuild = {
  id: number
  name: string
  urlName: string
  description: string
  imageUrl: string
  showMembers: boolean
  hideFromExplorer: boolean
  socialLinks: SocialLinks
  eventSources: EventSources
  onboardingComplete: boolean
  memberCount: number
  guildPin?: GuildPinConfig
  theme: Theme
}

type GuildAdmin = {
  id: number
  address: string
  isOwner: boolean
}

/**
 * This is really verbose with the huge amount of repeated nevers, it'll be solved by
 * adding it to @guildxyz/types, so leaving it like this for now
 */
type PlatformGuildData = {
  DISCORD: {
    role?: never
    inviteChannel: string
    invite?: string
    joinButton?: boolean
    needCaptcha?: boolean
    mimeType?: never
    iconLink?: never
    type?: never
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    name?: never
    symbol?: never
    description?: never
    text?: never
    texts?: never
    imageUrl?: never
    fancyId?: never
    eventId?: never
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenDecimals?: never
    tokenAddress?: never
  }
  GOOGLE: {
    role?: "reader" | "commenter" | "writer"
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    mimeType?: string
    iconLink?: string
    type?: never
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    name?: never
    symbol?: never
    description?: never
    text?: never
    texts?: never
    imageUrl?: never
    fancyId?: never
    eventId?: never
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  CONTRACT_CALL: {
    chain: Chain
    contractAddress: `0x${string}`
    function: ContractCallFunction
    argsToSign: string[]
    name: string
    symbol: string
    imageUrl: string
    description: string
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    text?: never
    texts?: never
    fancyId?: never
    eventId?: never
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  UNIQUE_TEXT: {
    texts: string[]
    text?: never
    name: string
    imageUrl: string
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    fancyId?: never
    eventId?: never
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  TEXT: {
    text: string
    texts?: never
    name: string
    imageUrl: string
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    fancyId?: never
    eventId?: never
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  POAP: {
    text?: never
    texts?: string[]
    name: string
    imageUrl: string
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    fancyId: string
    eventId: number
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  FORM: {
    text?: never
    texts?: never
    name?: never
    imageUrl?: never
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    fancyId?: never
    eventId?: never
    formId?: number
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  GATHER: {
    name: string
    gatherSpaceId: string
    gatherApiKey: string
    gatherAffiliation: string
    gatherRole: string
    role?: never
    text?: never
    texts?: never
    imageUrl?: never
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    mimeType?: never
    iconLink?: never
    fancyId?: never
    eventId?: never
    formId?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  POINTS: {
    text?: never
    texts?: never
    name?: string
    imageUrl?: string
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    fancyId?: never
    eventId?: never
    formId?: never
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    poolId?: never
    multiplier?: never
    tokenAddress?: never
  }
  ERC20: {
    poolId: number
    chain: Chain
    contractAddress: `0x${string}`
    tokenAddress: `0x${string}`
    name: string
    description: string
    imageUrl: string
    gatherSpaceId?: never
    gatherApiKey?: never
    gatherAffiliation?: never
    gatherRole?: never
    role?: never
    text?: never
    texts?: never
    function?: never
    argsToSign?: never
    symbol?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    mimeType?: never
    iconLink?: never
    fancyId?: never
    eventId?: never
    formId?: never
  }
}

type Trait = {
  trait_type?: string
  value?: string
  interval?: {
    min: number
    max: number
  }
}

type Requirement = {
  id: number
  type: RequirementType
  address?: `0x${string}`
  chain?: Chain
  data?: Record<string, any>
  roleId: number
  name: string
  symbol: string
  decimals?: number
  isNegated?: boolean
  visibility?: Visibility
  visibilityRoleId?: number | null

  // Props used inside the forms on the UI
  formFieldId?: number
  balancyDecimals?: number
  createdAt?: string
  updatedAt?: string
}

type RolePlatformStatus = "ALL_CLAIMED" | "NOT_STARTED" | "ENDED" | "ACTIVE"

type RolePlatform = {
  id: number
  platformRoleId?: string
  guildPlatformId?: number
  guildPlatform?: GuildPlatform
  platformRoleData?: Record<string, string | number | boolean>
  index?: number
  isNew?: boolean
  roleId?: number
  visibility?: Visibility
  visibilityRoleId?: number | null
  capacity?: number
  claimedCount?: number
  startTime?: string
  endTime?: string
  dynamicAmount?: Schemas["DynamicAmount"]
}

enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  HIDDEN = "HIDDEN",
}

type SimpleRole = {
  id: number
  name: string
  description?: string
  imageUrl?: string
  logic: Logic
  memberCount: number
  visibility: Visibility
  visibilityRoleId?: number | null
  position?: number
  anyOfNum?: number
  groupId?: number
}

type Role = SimpleRole & {
  groupId?: number
  members: string[]
  rolePlatforms: RolePlatform[]
  hiddenRequirements?: boolean
  hiddenRewards?: boolean
  createdAt?: string
  updatedAt?: string
  lastSyncedAt?: string
  requirements: Requirement[]
}

type GuildPlatform = {
  id?: number
  platformId: PlatformType
  platformName?: PlatformName
  platformGuildId: string
  platformGuildData?: PlatformGuildData[keyof PlatformGuildData]
  invite?: string
  platformGuildName?: string
  permission?: string
}

type GuildPlatformWithOptionalId = Omit<GuildPlatform, "id"> & { id?: number }

const supportedSocialLinks = [
  "TWITTER",
  "LENS",
  "YOUTUBE",
  "SPOTIFY",
  "MIRROR",
  "MEDIUM",
  "SUBSTACK",
  "SNAPSHOT",
  "SOUND",
  "WEBSITE",
  "GITHUB",
] as const
type SocialLinkKey = (typeof supportedSocialLinks)[number]
type SocialLinks = Partial<Record<SocialLinkKey, string>>

const guildTags = ["VERIFIED", "FEATURED"] as const
type GuildTags = (typeof guildTags)[number]

type GuildContact = {
  type: "EMAIL" | "TELEGRAM"
  contact: string
  id?: number
}

const supportedEventSources = ["LINK3", "EVENTBRITE", "LUMA", "DISCORD"] as const
type EventSourcesKey = (typeof supportedEventSources)[number]
type EventSources = Partial<Record<EventSourcesKey, string>>

type Guild = {
  id: number
  name: string
  urlName: string
  description?: string
  imageUrl: string
  showMembers: boolean
  memberCount: number
  hideFromExplorer: boolean
  socialLinks?: SocialLinks
  contacts?: GuildContact[]
  createdAt: string
  admins: GuildAdmin[]
  theme: Theme
  guildPlatforms: GuildPlatform[]
  roles: Role[]
  groups: Group[]
  members: Array<string>
  onboardingComplete: boolean
  featureFlags: FeatureFlag[]
  hiddenRoles?: boolean
  requiredPlatforms?: PlatformName[]
  tags: GuildTags[]
  eventSources: Record<EventSourcesKey, string>
  guildPin?: GuildPinConfig
  isFallback?: boolean
  isDetailed?: boolean
  parentRoles: number[]
}

type RoleFormType = Partial<
  Omit<Role, "requirements" | "rolePlatforms" | "name"> & {
    requirements: Array<Partial<Requirement>>
    rolePlatforms: Array<
      Partial<Omit<RolePlatform, "guildPlatform">> & {
        guildPlatform?: GuildPlatformWithOptionalId
        guildPlatformIndex?: number
      }
    >
  } & { name: string }
>

type GuildFormType = Partial<
  Pick<
    Guild,
    | "id"
    | "urlName"
    | "name"
    | "imageUrl"
    | "description"
    | "theme"
    | "contacts"
    | "featureFlags"
    | "tags"
    | "eventSources"
  >
> & {
  guildPlatforms?: (Partial<GuildPlatform> & { platformName: string })[]
  roles?: Array<RoleFormType>
  logic?: Logic
  requirements?: Requirement[]
  socialLinks?: Record<string, string>
  admins?: Array<{
    address: string
    id?: number
    isOwner?: boolean
  }>
  eventSources?: Record<EventSourcesKey, string>
}

type Group = {
  id: number
  urlName: string
  name: string
  description?: string
  imageUrl?: string
  type?: string
  position?: number
  guildId: number
}

type SelectOption<T = string> = {
  label: string
  value: T
  img?: string | JSX.Element
} & Rest

// Requested with Discord OAuth token
type DiscordServerData = {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
  features: string[]
  permissions_new: string
}

export enum PlatformType {
  "UNSET" = -1,
  "DISCORD" = 1,
  "TELEGRAM" = 2,
  "GITHUB" = 3,
  "GOOGLE" = 4,
  "TWITTER" = 5,
  // "STEAM" = 6,
  "CONTRACT_CALL" = 7,
  "TWITTER_V1" = 8,
  "UNIQUE_TEXT" = 9,
  "TEXT" = 10,
  "GUILD_PIN" = 11,
  "POLYGON_ID" = 12,
  "POINTS" = 13,
  "POAP" = 14,
  "FORM" = 15,
  "GATHER_TOWN" = 16,
  "ERC20" = 17,
}

type WalletConnectConnectionData = {
  connected: boolean
  accounts: string[]
  chainId: number
  bridge: string
  key: string
  clientId: string
  clientMeta: {
    description: string
    url: string
    icons: string[]
    name: string
  }
  peerId: string
  peerMeta: {
    description: string
    url: string
    icons: string[]
    name: string
  }
  handshakeId: number
  handshakeTopic: string
}

enum ValidationMethod {
  STANDARD = 1,
  KEYPAIR = 2,
  EIP1271 = 3,
  FUEL = 4,
}

type RequestMintLinksForm = {
  event_id: number
  requested_codes: number
  secret_code: string
  redeem_type: string
}

type Without<First, Second> = {
  [P in Exclude<keyof First, keyof Second>]?: never
}

type OneOf<First, Second> = First | Second extends object
  ? (Without<First, Second> & Second) | (Without<Second, First> & First)
  : First | Second

type GuildPinAttribute =
  | {
      trait_type: "type"
      value: string
    }
  | {
      trait_type: "guildId"
      value: string
    }
  | {
      trait_type: "userId"
      value: string
    }
  | {
      trait_type: "mintDate"
      display_type: "date"
      value: number
    }
  | {
      trait_type: "actionDate"
      display_type: "date"
      value: number
    }
  | {
      trait_type: "rank"
      value: string
    }

type GuildPinMetadata = {
  name: string
  description: string
  image: string
  attributes: GuildPinAttribute[]
}

type LeaderboardPinData = {
  tokenId: number
  chainId: Chains
  rank: number
  tokenUri: string
}

type DetailedPinLeaderboardUserData = {
  address: string
  score: number
  pins: LeaderboardPinData[]
}

export enum GameMode {
  GuessTheGuild = "GuessTheGuild",
  PairTheGuild = "PairTheGuild",
}

export enum GameLevel {
  "Easy" = 100,
  "Medium" = 500,
  "Hard" = 1000,
}

export { ValidationMethod, Visibility, supportedEventSources, supportedSocialLinks }
export type {
  BaseUser,
  CoingeckoToken,
  DetailedPinLeaderboardUserData as DetailedUserLeaderboardData,
  DiscordError,
  DiscordServerData,
  EventSources,
  EventSourcesKey,
  GitPoap,
  Group,
  Guild,
  GuildAdmin,
  GuildBase,
  GuildFormType,
  GuildPinMetadata,
  GuildPlatform,
  GuildPlatformWithOptionalId,
  GuildTags,
  LeaderboardPinData,
  Logic,
  NFT,
  OneOf,
  PlatformAccountDetails,
  PlatformGuildData,
  PlatformName,
  Poap,
  RequestMintLinksForm,
  Requirement,
  RequirementType,
  Rest,
  Role,
  RoleFormType,
  RolePlatform,
  RolePlatformStatus,
  SelectOption,
  SimpleGuild,
  SimpleRole,
  SocialLinkKey,
  SocialLinks,
  Token,
  Trait,
  User,
  UserAddress,
  WalletConnectConnectionData,
  WalletError,
}
