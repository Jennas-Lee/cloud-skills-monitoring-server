import { Model, DataTypes } from 'sequelize';
import sequelize from '../models';

const userFactory = () => {
  class Users extends Model {}

  Users.init({
    name: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    company: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    modelName: 'Users',
    tableName: 'Users',
    sequelize,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  });

  return Users;
}

export default userFactory;