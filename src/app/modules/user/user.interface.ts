export interface IUser {
  userId: string;
  email: string;
  password: string;
  role: "customer" | "seller" | "admin";
  isDeleted: boolean;
  status: "regular" | "blocked";
}
