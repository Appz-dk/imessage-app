import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationModal from "../../Modal/ConversationModal";

type ConversationsListProps = {
  session: Session;
};

const ConversationsList: React.FC<ConversationsListProps> = ({ session }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Box
        py="2"
        px="4"
        bg={"blackAlpha.300"}
        borderRadius="4"
        cursor="pointer"
        onClick={() => {
          onOpen();
        }}
      >
        <Text color="whiteAlpha.800" textAlign="center" fontWeight="500">
          Find or start a new conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ConversationsList;
