import { Sequelize, Model, DataTypes } from 'sequelize';

interface UserAttributes {
  name: string,
  company: string,
  email: string,
  password: string
}

class Users extends Model<UserAttributes> {
  public readonly id!: number;
  public name!: string;
  public company!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

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
  }
}, {
  modelName: 'Users',
  tableName: 'Users',
  sequelize,
  freezeTableName: true,
  timestamps: true,
  paranoid: true,
});

export default Users;