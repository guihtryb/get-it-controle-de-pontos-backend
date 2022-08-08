export default interface Sale {
  id?: number;
  userId: number;
  sellerId: number;
  totalPrice: number;
  deliveryAddress: string;
  deliveryNumber: string;
  saleDate: Date;
  status: string;
  totalPoints: number;
}
