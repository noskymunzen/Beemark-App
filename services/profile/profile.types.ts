interface UserData {
  email?: string;
  name?: string;
  passwords?: { currentPassword: string; newPassword: string };
}

export type { UserData };
