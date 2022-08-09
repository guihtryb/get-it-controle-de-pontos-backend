export default interface ISale {
  id?: number;
  sellerId: number;
  userId: number;
  totalPrice: number;
  totalPoints: number;
  deliveryAddress: string;
  deliveryNumber: number;
  saleDate: Date;
  status: string;
}
