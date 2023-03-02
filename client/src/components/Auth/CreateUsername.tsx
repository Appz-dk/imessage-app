import { Button, Input, Text } from "@chakra-ui/react";

type CreateUsernameProps = {
  username: string;
  setUsername: (username: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

const CreateUsername: React.FC<CreateUsernameProps> = ({
  username,
  setUsername,
  onSubmit,
  loading,
}) => {
  return (
    <>
      <Text fontSize="2xl">Create a Username</Text>
      <Input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a username"
      />
      <Button w="full" onClick={onSubmit} isLoading={loading}>
        Save
      </Button>
    </>
  );
};

export default CreateUsername;
