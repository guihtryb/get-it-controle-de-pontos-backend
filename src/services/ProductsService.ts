import IProduct from '../interfaces/IProduct';
import IService from '../interfaces/IService';
import Products from '../database/models/Products';

export default class ProductsService implements IService<IProduct> {
  private _model;

  constructor() {
    this._model = Products;
  }

  async create(newProduct: IProduct): Promise<IProduct | false> {
    const alreadyExists = await this._model
      .findOne({ where: { name: newProduct.name } });

    if (alreadyExists) return false;

    return this._model.create(newProduct);
  }

  async getById(id: string): Promise<IProduct | null> {
    const parsedId = +id;

    const product = await this._model.findByPk(parsedId);

    if (!product) return null;

    return product;
  }

  async getAll(): Promise<IProduct[]> {
    return this._model.findAll();
  }

  async update(id: string, product: IProduct): Promise<IProduct | null> {
    const parsedId = +id;

    const productToUpdate = await this.getById(id);

    if (!productToUpdate) return null;

    await this._model.update(product, { where: { id: parsedId } });

    const productUpdated = await this.getById(id);

    return productUpdated;
  }

  async delete(id: string): Promise<IProduct | null> {
    const parsedId = +id;

    const productToDelete = await this.getById(id);
    
    if (!productToDelete) return null;

    await this._model.destroy({ where: { id: parsedId } });

    return productToDelete;
  }
}

export const productsService = new ProductsService();
