import { Button, Card, Center, Text } from "@chakra-ui/react"
import GuildLogo from "components/common/GuildLogo"
import { useMemo, useState } from "react"
import { GuildBase } from "types"

type Props = {
  guildData: GuildBase[]
  onLevelSelectDisable: (isLevelSelectDisable: boolean) => void
  finishedRound: (points: number) => void
}

const GuessTheGuild = ({
  guildData,
  onLevelSelectDisable,
  finishedRound,
}: Props): JSX.Element => {
  const [isShowResult, setIsShowResult] = useState<boolean>(false)
  const [correctAnswerId, setCorrectAnswerId] = useState<number>()
  const [wrongAnswerId, setWrongAnswerId] = useState<number>()
  const [randomGuild, setRandomGuild] = useState<GuildBase>(
    guildData[Math.floor(Math.random() * guildData.length)]
  )

  const possibleGuilds: GuildBase[] = useMemo(
    () =>
      [
        ...guildData
          ?.filter((guild) => guild.id !== randomGuild.id)
          .sort(() => Math.random() - Math.random())
          .slice(0, 3),
        randomGuild,
      ].sort(() => Math.random() - Math.random()),
    [randomGuild]
  )

  const onSubmit = (guildId: number) => {
    if (!isShowResult) {
      if (guildId === randomGuild.id) {
        setCorrectAnswerId(guildId)
      } else {
        setCorrectAnswerId(randomGuild.id)
        setWrongAnswerId(guildId)
        onLevelSelectDisable(false)
      }
      setIsShowResult(true)
    }
  }

  const onStartNewGame = () => {
    setCorrectAnswerId(null)
    onLevelSelectDisable(true)
    resetSettings()
    finishedRound(0)
  }

  const nextRound = () => {
    setRandomGuild(guildData[Math.floor(Math.random() * guildData.length)])
    resetSettings()
    finishedRound(1)
  }

  const resetSettings = () => {
    setRandomGuild(guildData[Math.floor(Math.random() * guildData.length)])
    setWrongAnswerId(null)
    setIsShowResult(false)
  }

  const getCorrectName = () => {
    if (!isShowResult) {
      return "???"
    }
    return !wrongAnswerId ? randomGuild.name : "Game over! Try again!"
  }

  return (
    <>
      <Center>
        <GuildLogo size="85px" imageUrl={randomGuild.imageUrl} />
      </Center>
      <Text
        as="span"
        fontWeight="bold"
        mt="3"
        mb="6"
        textAlign="center"
        color="white"
      >
        {getCorrectName()}
      </Text>
      {possibleGuilds?.map((guild) => (
        <Card
          key={guild.id}
          my="2"
          py="4"
          borderRadius="13px"
          border={
            [correctAnswerId, wrongAnswerId].includes(guild.id)
              ? guild.id === correctAnswerId
                ? "green 3px solid"
                : "red 3px solid"
              : "#37373a 3px solid"
          }
          cursor="pointer"
          onClick={() => {
            onSubmit(guild.id)
          }}
        >
          <Center>
            <Text fontWeight="bold" textAlign="center">
              {guild.name}
            </Text>
          </Center>
        </Card>
      ))}
      <Center mt="4" height={"45px"}>
        {isShowResult &&
          (wrongAnswerId ? (
            <Button colorScheme="green" onClick={() => onStartNewGame()}>
              Start new game
            </Button>
          ) : (
            <Button colorScheme="green" onClick={() => nextRound()}>
              Next Round
            </Button>
          ))}
      </Center>
    </>
  )
}

export default GuessTheGuild
