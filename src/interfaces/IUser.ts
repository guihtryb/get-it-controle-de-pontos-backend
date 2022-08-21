import { z } from 'zod';

const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userZodSchema = z.object({
  id: z.number().optional(),
  fullName: z.string({
    required_error: 'fullName is required',
    invalid_type_error: 'fullName must be a string',
  }).min(7, { message: 'fullName must be 7 or more characters long' }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email().regex(emailRegex),
  password: z.string()
    .min(
      5,
      { message: 'password must be 5 or more characters long' },
    ).optional(),
  points: z.number(),
  role: z.string().min(6, {
    message: 'role must be 6 or more characters long',
  }),
});

export interface IUserTokenData {
  id: number | undefined;
  fullName: string;
  email: string;
  role: string;
}

type IUser = z.infer<typeof userZodSchema>;

export default IUser;
export { userZodSchema };
