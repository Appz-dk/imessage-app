import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationsList from "./ConversationsList";

type ConversationsWrapperProps = {
  session: Session;
};

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({ session }) => {
  return (
    <Box width={{ sm: "100%", md: "25rem" }} py="6" px="3" bgColor="whiteAlpha.50">
      <ConversationsList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
