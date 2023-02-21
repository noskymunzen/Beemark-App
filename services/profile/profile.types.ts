export interface UserData {
  email?: string;
  name?: string;
  passwords?: { currentPassword: string; newPassword: string };
}
