import {
  Button,
  Card,
  Center,
  Circle,
  HStack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import GuildLogo from "components/common/GuildLogo"
import { Users } from "phosphor-react"
import { useEffect, useState } from "react"
import { GuildBase } from "types"
import pluralize from "utils/pluralize"

type GuildIdCompare = {
  selectedGuildId?: number
  dragabbleGuildId: number
  dragabbleGuildImageUrl: string
}

type Props = {
  guildData: GuildBase[]
  onLevelSelectDisable: (levelSelectDisable: boolean) => void
  finishedRound: (points: number) => void
}

const PairTheGuild = ({
  guildData,
  onLevelSelectDisable,
  finishedRound,
}: Props): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [draggedGuilds, setDraggedGuilds] = useState<GuildIdCompare[]>([])
  const [tempDraggedGuild, setTempDraggedGuild] = useState<GuildIdCompare>()
  const [guildLogos, setGuildLogos] = useState<GuildBase[]>([])
  const [guildDetails, setGuildDetails] = useState<GuildBase[]>([])

  useEffect(() => {
    if (!isSubmitted) {
      const guilds = guildData
        ?.sort(() => Math.random() - Math.random())
        ?.slice(0, 4)
      setGuildLogos([...guilds])
      setGuildDetails([...guilds?.sort(() => Math.random() - 0.5)])
    }
  }, [isSubmitted])

  const onSubmit = () => {
    setIsSubmitted(true)
    const allIsCorrect = !draggedGuilds?.some(
      (guild) => guild.dragabbleGuildId !== guild.selectedGuildId
    )
    setIsCorrect(allIsCorrect)
    onLevelSelectDisable(allIsCorrect)
  }

  const nextRound = () => {
    finishedRound(2)
    resetSettings()
  }

  const onStartNewGame = () => {
    finishedRound(0)
    resetSettings()
    onLevelSelectDisable(true)
  }

  const resetSettings = () => {
    setIsSubmitted(false)
    setDraggedGuilds([])
    guildData = { ...guildData }
  }

  const onClear = () => setDraggedGuilds([])

  const handleDrag = (guild) => {
    setTempDraggedGuild({
      dragabbleGuildId: guild.id,
      dragabbleGuildImageUrl: guild.imageUrl,
    })
  }

  const getFilteredGuildLogos = (): GuildBase[] =>
    guildLogos.filter(
      (guild) =>
        !draggedGuilds.some(
          (draggedGuild) => draggedGuild.dragabbleGuildId === guild.id
        )
    )

  const getDraggedGuild = (guildId: number): GuildIdCompare =>
    draggedGuilds?.find((logo) => logo.selectedGuildId === guildId)

  const handleOnDrop = (guildId) => {
    if (!draggedGuilds.some((guild) => guild.selectedGuildId === guildId)) {
      setDraggedGuilds([
        ...draggedGuilds,
        { ...tempDraggedGuild, selectedGuildId: guildId },
      ])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Center>
        <HStack
          position="relative"
          px={{ base: 5, sm: 6 }}
          mb="4"
          gap="6"
          height={"80px"}
        >
          {!isSubmitted ? (
            <>
              {getFilteredGuildLogos().map((guild) => (
                <GuildLogo
                  draggable
                  onDragStart={() => handleDrag(guild)}
                  key={guild.id}
                  size="4rem"
                  imageUrl={guild.imageUrl}
                />
              ))}
            </>
          ) : (
            <Text as="span" fontSize="lg" fontWeight="bold" color="white">
              {isCorrect ? "Correct! Click next button!" : "Game over! Try again!"}
            </Text>
          )}
        </HStack>
      </Center>
      {guildDetails.map((guild) => (
        <Card
          key={guild.id}
          my="2"
          p="4"
          borderRadius="13px"
          border={
            isSubmitted
              ? draggedGuilds.find(
                  (draggedGuild) => draggedGuild.selectedGuildId === guild.id
                )?.dragabbleGuildId === guild.id
                ? "green 3px solid"
                : "red 3px solid"
              : "#37373a 3px solid"
          }
        >
          <SimpleGrid
            templateColumns="4rem calc(100% - 5rem)"
            gap={4}
            key={guild.id}
            alignItems="center"
            onDrop={() => handleOnDrop(guild.id)}
            onDragOver={(e) => handleDragOver(e)}
          >
            {getDraggedGuild(guild.id) ? (
              <GuildLogo
                key={guild.id}
                size="4rem"
                imageUrl={getDraggedGuild(guild.id).dragabbleGuildImageUrl}
              />
            ) : (
              <Circle
                key={guild.id}
                borderWidth={2}
                borderStyle="dashed"
                size="4rem"
              ></Circle>
            )}
            <VStack
              spacing={2}
              alignItems="start"
              w="full"
              maxW="full"
              mb="0.5"
              mt="-1"
            >
              <HStack spacing={1}>
                <Text
                  as="span"
                  fontFamily="display"
                  fontSize="lg"
                  fontWeight="bold"
                  letterSpacing="wide"
                  maxW="full"
                  noOfLines={1}
                  wordBreak="break-all"
                >
                  {guild.name}
                </Text>
              </HStack>
              <Wrap zIndex="1">
                <Tag as="li">
                  <TagLeftIcon as={Users} />
                  <TagLabel>
                    {new Intl.NumberFormat("en", { notation: "compact" }).format(
                      guild.memberCount ?? 0
                    )}
                  </TagLabel>
                </Tag>
                <Tag as="li">
                  <TagLabel>{pluralize(guild.rolesCount ?? 0, "role")}</TagLabel>
                </Tag>
              </Wrap>
            </VStack>
          </SimpleGrid>
        </Card>
      ))}
      <HStack justifyContent="center" mt="4">
        {!isSubmitted ? (
          <>
            <Button
              colorScheme="green"
              onClick={onSubmit}
              isDisabled={draggedGuilds.length !== 4}
            >
              Submit
            </Button>
            <Button onClick={onClear} isDisabled={draggedGuilds.length < 1}>
              Clear
            </Button>
          </>
        ) : isCorrect ? (
          <Button colorScheme="green" onClick={() => nextRound()}>
            Next Round
          </Button>
        ) : (
          <Button colorScheme="green" onClick={() => onStartNewGame()}>
            Start new game
          </Button>
        )}
      </HStack>
    </>
  )
}
export default PairTheGuild
