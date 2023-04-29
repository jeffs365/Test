import { Model, DataTypes } from 'sequelize';
import db from '../config/database.config';
import { Shelve } from '../shelve/shelve.model';

class Book extends Model {
  public bookId!: number;
  public shelveId!: number;
  public title!: string;
}

Book.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shelveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Book',
  },
);

// Define associations
Book.belongsTo(Shelve, { foreignKey: 'shelveId' });
Shelve.hasMany(Book, { foreignKey: 'shelveId' });

export { Book };
