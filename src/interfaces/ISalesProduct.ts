import { z } from 'zod';

const salesProductSchema = z.object({
  productId: z.number({
    required_error: 'productId is required',
    invalid_type_error: 'productId must be a number',
  }),
  saleId: z.number().optional(),
  quantity: z.number({
    required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a number',
  }),
});

type ISalesProduct = z.infer<typeof salesProductSchema>;

export { ISalesProduct };
export default salesProductSchema;