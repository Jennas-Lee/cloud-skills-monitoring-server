import { Model, DataTypes } from 'sequelize';
import sequelize from '../models';

const tokenFactory = () => {
  class Tokens extends Model {
    token!: string;
  }

  Tokens.init({
    token: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
  }, {
    modelName: 'Tokens',
    tableName: 'Tokens',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
  });

  return Tokens;
}

export default tokenFactory;