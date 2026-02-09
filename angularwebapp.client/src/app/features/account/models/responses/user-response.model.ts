import { UserRole } from '@shared/enums/user-role.enum';

export interface UserResponse {
  id: number;
  userName: string;
  role: UserRole;
}
