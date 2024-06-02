export type UserDetails = {
  id: string;
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string | null;
  genderId: number;
  birthday: string;
  tel: string;
  snils: string | null;
}

export type User = {
  id: string;
  createdAt: string;
  username: string;
  email: string;
  isVerified: boolean;
  needsDorm: boolean;
  permissions: string;
  details: UserDetails | null;
}