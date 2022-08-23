import { z } from 'zod';
import salesProductSchema from './ISalesProduct';

const saleSchema = z.object({
  id: z.number().optional(),
  sellerId: z.number({
    required_error: 'name is required',
    invalid_type_error: 'name must be a number',
  }),
  userId: z.number({
    required_error: 'name is required',
    invalid_type_error: 'name must be a number',
  }),
  deliveryAddress: z.string({
    required_error: 'deliveryAddress is required',
    invalid_type_error: 'deliveryAddress must be a string',
  }).min(5, { message: 'deliveryAddress must be 5 or more characters long' }),
  deliveryNumber: z.string({
    required_error: 'deliveryNumber is required',
    invalid_type_error: 'deliveryNumber must be a string',
  }),
  totalPrice: z.number({
    required_error: 'totalPrice is required',
    invalid_type_error: 'totalPrice must be a number',
  }),
  totalPoints: z.number({
    required_error: 'urlImage is required',
    invalid_type_error: 'urlImage must be a string',
  }),
  saleDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  products: z.array(salesProductSchema),
  status: z.string({
    required_error: 'status is required',
    invalid_type_error: 'status must be a string',
  }),
});

type ISale = z.infer<typeof saleSchema>;

export { ISale };
export default saleSchema;
