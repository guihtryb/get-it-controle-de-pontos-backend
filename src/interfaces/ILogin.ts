import { z } from 'zod';

const loginSchema = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string',
  }).email({ message: 'Invalid email' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
});

type ILogin = z.infer<typeof loginSchema>;

export { ILogin };
export default loginSchema;