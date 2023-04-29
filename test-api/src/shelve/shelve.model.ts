import { Model, DataTypes } from 'sequelize';
import db from '../config/database.config';

class Shelve extends Model {
  public shelveId!: number;
  public parentShelveId!: number | null;
  public name!: string;

  // Define associations
  static associate(models: any) {
    Shelve.hasMany(models.Book, { foreignKey: 'shelveId' });
  }
}

Shelve.init(
  {
    shelveId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parentShelveId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Shelve',
  },
);

export { Shelve };
