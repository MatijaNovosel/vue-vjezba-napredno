import { PermissionPolicyEnum } from "../../enums/permissionPolicyEnum";
import { UserDTO } from "./userListQueryResponse";
export interface currentUserQuery extends UserDTO {
  permissions?: PermissionPolicyEnum[];
}
