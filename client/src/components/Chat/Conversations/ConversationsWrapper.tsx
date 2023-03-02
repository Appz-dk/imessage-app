import { Session } from "next-auth";

type ConversationsWrapperProps = {
  session: Session;
};

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({ session }) => {
  return <div>ConversationsWrapper</div>;
};

export default ConversationsWrapper;
