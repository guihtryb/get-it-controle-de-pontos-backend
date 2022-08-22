import { ISale } from '../interfaces/ISale';
import IService from '../interfaces/IService';
import Sales from '../database/models/Sales';
import SalesProducts from '../database/models/SalesProducts';

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
    products: SalesProducts[],
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

  async create(
    newSale: ISale,
  ): Promise<ISale | false> {
    const saleWithoutProducts = SalesService.excludeSaleProducts(newSale);

    const { products } = newSale;

    const { id } = await this._model.create({ ...saleWithoutProducts });
    
    await Promise.all(
      products.map(async (saleProduct) => SalesProducts
        .create({ saleId: id, ...saleProduct })),
    );

    const sale = await this.getById(id.toString());

    if (!sale) return false;

    return sale;
  }

  async getById(id: string): Promise<ISale | null> {
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
      sales.map(({ id }) => this.getById(id.toString())),
    ) as ISale[];

    return salesWithProducts;
  }

  async update(id: string, sale: ISale): Promise<ISale | null> {
    const parsedId = +id;

    const saleToUpdate = await this.getById(id);

    if (!saleToUpdate) return null;

    await this._model.update(sale, { where: { id: parsedId } });

    const SaleUpdated = await this.getById(id);

    return SaleUpdated;
  }

  async delete(id: string): Promise<ISale | null> {
    const parsedId = +id;

    const saleToDelete = await this.getById(id);
    
    if (!saleToDelete) return null;

    await this._model.destroy({ where: { id: parsedId } });

    return saleToDelete;
  }
}

export const salesService = new SalesService();
