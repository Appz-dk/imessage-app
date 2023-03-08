import { SearchedUser, SearchUsersData, SearchUsersVariables } from "@/utils/types";
import { useLazyQuery } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import UserOperations from "../../../../graphql/operations/user";
import Participants from "./Participants";
import UserSearchList from "./UserSearchList";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<SearchedUser[]>([]);
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersVariables
  >(UserOperations.Queries.searchUsers);

  const onCreateConversation = async () => {
    try {
      // Start new convo with selectedUsers
    } catch (error: any) {
      console.log("onCreateConversation error", error);
      toast.error(error.message);
    }
    // reset selectedUsers array
    setSelectedUsers([]);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // GraphQL query with username
    searchUsers({ variables: { username } });
    // Reset username
    setUsername("");
  };

  const onSelectUser = (user: SearchedUser) => {
    setSelectedUsers((prev) => [...prev, user]);
  };

  const onRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb="4">
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap="6">
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" isDisabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                selectedUsers={selectedUsers}
                onSelectUser={onSelectUser}
              />
            )}
            {selectedUsers.length > 0 && (
              <>
                <Participants selectedUsers={selectedUsers} onRemoveUser={onRemoveUser} />
                <Button
                  bgColor="brand.100"
                  width="full"
                  _hover={{
                    bgColor: "blue.700",
                  }}
                  onClick={() => {}}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
