import { PermissionPolicyEnum } from "../../enums/permissionPolicyEnum";
import { UserDTO } from "./userListQueryResponse";
export interface CurrentUserQuery extends UserDTO {
  permissions?: PermissionPolicyEnum[];
}
