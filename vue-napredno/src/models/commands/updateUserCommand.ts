export interface UpdateUserCommand {
  id: string;
  username: string;
  firstName: string;
  familyName: string;
  oldPassword: string;
  newPassword?: string | null;
}
