import { Img } from "@chakra-ui/react"
import Requirement, {
  RequirementProps,
} from "components/[guild]/Requirements/components/Requirement"
import { useRequirementContext } from "components/[guild]/Requirements/components/RequirementContext"
import DataBlock from "components/common/DataBlock"
import { rabbitholeCourses } from "./RabbitholeForm"

const RabbitholeRequirement = (props: RequirementProps) => {
  const requirement = useRequirementContext()

  return (
    <Requirement image={<Img src="/requirementLogos/rabbithole.png" />} {...props}>
      {`Have an NFT from the `}
      <DataBlock>
        {
          rabbitholeCourses.find((course) => course.value === requirement.address)
            .label
        }
      </DataBlock>
      {` Rabbithole skill`}
    </Requirement>
  )
}

export default RabbitholeRequirement
