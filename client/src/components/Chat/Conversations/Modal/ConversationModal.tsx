import { SearchUsersData, SearchUsersVariables } from "@/utils/types";
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
import UserOperations from "../../../../graphql/operations/user";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConversationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersVariables
  >(UserOperations.Queries.searchUsers);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // GraphQL query with username
    searchUsers({ variables: { username } });
    // Reset username
    setUsername("");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb="4">
          <ModalHeader>List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" isDisabled={!username}>
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
