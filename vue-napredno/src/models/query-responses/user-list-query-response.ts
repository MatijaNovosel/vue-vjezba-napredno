export interface UserListQueryResponse {
  totalItems: number;
  users: UserDTO[];
}

export interface UserDTO {
  id: string;
  userName: string;
  firstName: string;
  familyName: string;
}
