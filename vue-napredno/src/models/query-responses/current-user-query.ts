import { PermissionPolicyEnum } from "./../../enums/permission-policy-enum";
import { UserDTO } from "./user-list-query-response";
export interface currentUserQuery extends UserDTO {
  permissions?: PermissionPolicyEnum[];
}
