import { SearchedUser } from "@/utils/types";
import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

type UserSearchListProps = {
  users: Array<SearchedUser>;
};

const UserSearchList: React.FC<UserSearchListProps> = ({ users }) => {
  return (
    <Stack mt="4" spacing="2">
      {users.length === 0 && (
        <Box>
          <Text textAlign="center">No users found...</Text>
        </Box>
      )}
      {users.length !== 0 &&
        users.map((user) => (
          <Flex
            key={user.id}
            p="2"
            align="center"
            gap="4"
            borderRadius="4"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            {/* TODO: add custom profile picture to Avatar as src="" */}
            <Avatar boxSize="8" />
            <Text color="whiteAlpha.800">{user.username}</Text>
            <Button
              size="sm"
              marginLeft="auto"
              bg="brand.100"
              _hover={{ bg: "blue.700" }}
              onClick={() => {}}
            >
              Select
            </Button>
          </Flex>
        ))}
    </Stack>
  );
};

export default UserSearchList;
