import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Products extends Model {
  id!: number;
  name: string;
  urlImage: string;
  totalQuantity: number;
  price: number;
  size: string;
  pointsConverter: number;
}

Products.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(255),
    allowNull: false,
  },
  totalQuantity: {
    type: INTEGER,
    allowNull: false,
    // field: 'total_quantity'
  },
  price: {
    type: DECIMAL(9, 2),
    allowNull: false,
  },
  size: {
    type: STRING(255),
  },
  pointsConverter: {
    type: DECIMAL(9, 2),
    // field: 'points_converter'
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Products',
  timestamps: false
});

export default Products;