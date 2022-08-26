import { ISale } from '../interfaces/ISale';
import IService from '../interfaces/IService';
import { ISalesProduct } from '../interfaces/ISalesProduct';
import Sales from '../database/models/Sales';
import SalesProducts from '../database/models/SalesProducts';
import { productsService } from './ProductsService';
import { usersService } from './UsersService';
import Users from '../database/models/Users';

export default class SalesService implements IService<ISale> {
  private _model;

  constructor() {
    this._model = Sales;
  }

  static excludeSaleProducts(sale: ISale) {
    const saleInfos = {
      id: sale.id,
      sellerId: sale.sellerId,
      userId: sale.userId,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: sale.status,
      totalPoints: sale.totalPoints,
      totalPrice: sale.totalPrice,
      saleDate: sale.saleDate,
    };

    return saleInfos;
  }

  static includeSaleProducts(
    sale: Sales,
    products: ISalesProduct[],
  ) {
    const saleInfos = {
      id: sale.id,
      sellerId: sale.sellerId,
      userId: sale.userId,
      deliveryAddress: sale.deliveryAddress,
      deliveryNumber: sale.deliveryNumber,
      status: sale.status,
      totalPoints: sale.totalPoints,
      totalPrice: sale.totalPrice,
      saleDate: sale.saleDate,
      products,
    };

    return saleInfos;
  }

  static async registerSaleProducts(id: number, products: ISalesProduct[]) {
    await Promise.all(
      products.map(async (product) => {
        await SalesProducts.create({ saleId: id, ...product });
        const productBought = await productsService
          .getById(product.productId);

        if (productBought) {
          const productId = productBought.id as number;
          const quantityDecreased = productBought
            .totalQuantity - product.quantity;
          const totalQuantity = quantityDecreased < 0 ? 0 : quantityDecreased; 
          await productsService
            .update(productId, { totalQuantity });
        }
      }),
    );
  }

  async create(
    newSale: ISale,
  ): Promise<ISale | false> {
    const saleWithoutProducts = SalesService.excludeSaleProducts(newSale);

    const {
      id,
      userId,
      totalPoints,
    } = await this._model.create({ ...saleWithoutProducts });

    const { products } = newSale;

    await SalesService.registerSaleProducts(id, products);

    const { points: userPoints } = await usersService.getById(userId) as Users;

    await usersService.update(userId, { points: +userPoints + +totalPoints });
    const sale = await this.getById(id);

    if (!sale) return false;

    return sale;
  }

  async getById(id: number): Promise<ISale | null> {
    const parsedId = +id;

    const sale = await this._model.findByPk(parsedId);

    if (!sale) return null;

    const products = await SalesProducts
      .findAll({ where: { saleId: parsedId } });

    if (!products) return null;

    const saleWithProducts = SalesService.includeSaleProducts(sale, products);
  
    return saleWithProducts;
  }

  async getAll(): Promise<ISale[]> {
    const sales = await this._model.findAll();

    const salesWithProducts = await Promise.all(
      sales.map(({ id }) => this.getById(id)),
    ) as ISale[];

    return salesWithProducts;
  }

  async update(id: number, saleField: object): Promise<ISale | null> {
    const parsedId = +id;

    const saleToUpdate = await this.getById(id);

    if (!saleToUpdate) return null;

    const [key] = Object.keys(saleField);
    const [value] = Object.values(saleField);

    await this._model.update({ [key]: value }, { where: { id: parsedId } });

    const SaleUpdated = await this.getById(id);

    return SaleUpdated;
  }

  async delete(id: number): Promise<ISale | null> {
    const parsedId = +id;

    const saleToDelete = await this.getById(id);
    
    if (!saleToDelete) return null;

    await this._model.destroy({ where: { id: parsedId } });

    return saleToDelete;
  }
}

export const salesService = new SalesService();
