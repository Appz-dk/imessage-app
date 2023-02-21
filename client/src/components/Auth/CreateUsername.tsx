import { Button, Input, Text } from "@chakra-ui/react";

type CreateUsernameProps = {
  username: string;
  setUsername: (username: string) => void;
  onSubmit: () => void;
};

const CreateUsername: React.FC<CreateUsernameProps> = ({ username, setUsername, onSubmit }) => {
  return (
    <>
      <Text fontSize="2xl">Create a Username</Text>
      <Input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a username"
      />
      <Button w="full" onClick={onSubmit}>
        Save
      </Button>
    </>
  );
};

export default CreateUsername;
