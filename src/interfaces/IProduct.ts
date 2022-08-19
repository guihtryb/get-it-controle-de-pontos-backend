import { z } from "zod";

const productZodSchema = z.object({
  id: z.number().optional(),
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string'
  }),
  urlImage: z.string({
    required_error: 'urlImage is required',
    invalid_type_error: 'urlImage must be a string'
  }),
  totalQuantity: z.number(),
  price: z.number(),
  size: z.string().optional(),
  pointsConverter: z.number(),
});

type IProduct = z.infer<typeof productZodSchema>;

export default IProduct;
export { productZodSchema };