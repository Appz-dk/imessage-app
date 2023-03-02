// User types

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersVariables {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser> // Array of Objects containing an id and a username
}

export interface SearchedUser {
  id: string;
  username: string;
}