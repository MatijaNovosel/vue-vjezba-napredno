import { PermissionPolicyEnum } from "@/enums/permissionPolicyEnum";
import { UserDTO } from "../query-responses/userListQueryResponse";

export interface LoginCustomerCommandResponse extends UserDTO {
  token: string;
  permissions?: PermissionPolicyEnum[];
}
