import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { GameLevel } from "types"

type Props = {
  selected: GameLevel
  isLevelSelectDisable: boolean
  onSelect: (level: GameLevel) => void
}

const gameLevels: GameLevel[] = [GameLevel.Easy, GameLevel.Medium, GameLevel.Hard]

const SelectGameLevel = ({
  selected,
  isLevelSelectDisable,
  onSelect,
}: Props): JSX.Element => {
  const selectedBg = useColorModeValue("white", "gray.600")
  const selectedButtonColor = useColorModeValue("gray.600", "")
  const hoverColor = useColorModeValue("", "transparent")
  const MotionBox = motion(Box)

  return (
    <>
      <HStack as="ul" gap={1.5} justify="flex-end" mb="2">
        {gameLevels.map((level) => {
          const isSelected = selected === level
          return (
            <Box key={level} position={"relative"}>
              <Button
                isDisabled={isLevelSelectDisable}
                size="sm"
                variant="ghost"
                borderRadius="lg"
                onClick={() => onSelect(level)}
                zIndex={1}
                bgColor={selectedButtonColor}
                {...(isSelected && { _hover: { bg: hoverColor } })}
              >
                <Text color="white">{GameLevel[level]}</Text>
              </Button>
              {isSelected && (
                <MotionBox
                  style={{
                    position: "absolute",
                    inset: 0,
                  }}
                  layoutId="slide-bg"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  boxShadow="0 0.5px 2px 0 rgba(0, 0, 0, 0.2)"
                  borderRadius="lg"
                  bgColor={`${selectedBg} !important`}
                  height="var(--chakra-sizes-8)"
                />
              )}
            </Box>
          )
        })}
      </HStack>
    </>
  )
}

export default SelectGameLevel
