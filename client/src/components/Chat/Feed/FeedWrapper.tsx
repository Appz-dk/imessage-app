import { Session } from "next-auth";

type FeedWrapperProps = {
  session: Session;
};

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  return <div>Feed Wrapper</div>;
};

export default FeedWrapper;
