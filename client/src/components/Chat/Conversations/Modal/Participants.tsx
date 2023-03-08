import { SearchedUser } from "@/utils/types";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/Io";

type ParticipantsProps = {
  selectedUsers: SearchedUser[];
  onRemoveUser: (userId: string) => void;
};

const Participants: React.FC<ParticipantsProps> = ({ selectedUsers, onRemoveUser }) => {
  return (
    <Flex gap="2" flexWrap="wrap" fontSize=".85rem">
      {selectedUsers.map((user) => (
        <Stack
          key={user.id}
          direction="row"
          align="center"
          borderRadius="4"
          paddingBlock="1"
          paddingInline="2"
          bgColor="whiteAlpha.300"
          cursor="pointer"
          onClick={() => onRemoveUser(user.id)}
        >
          <Text>{user.username}</Text>
          <IoIosCloseCircleOutline size={18} />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
