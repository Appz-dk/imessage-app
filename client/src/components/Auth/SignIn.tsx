import { Button, Image, Stack, Text } from "@chakra-ui/react";

type SignInProps = {
  signIn: (provider: string) => void;
};

const SignIn: React.FC<SignInProps> = ({ signIn }) => {
  return (
    <Stack align="center" spacing={6}>
      <Text fontSize="3xl">iMessage QL</Text>
      <Button
        leftIcon={<Image boxSize={5} src="/images/googlelogo.png" />}
        onClick={() => signIn("google")}
      >
        Contrinue with Google
      </Button>
    </Stack>
  );
};

export default SignIn;
