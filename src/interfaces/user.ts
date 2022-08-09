export default interface IUser {
  id?: number;
  fullName: string;
  email: string;
  password?: string;
  points: number;
  role: string;
}
