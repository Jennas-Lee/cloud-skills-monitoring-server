import { Model, DataTypes } from 'sequelize';
import sequelize from '../models';

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - company
 *          - email
 *          - password
 *          - isAdmin
 *        properties:
 *          name:
 *            type: string
 *          company:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *          isAdmin:
 *            type: boolean
 */

const userFactory = () => {
  class Users extends Model {
    name!: string;
    company!: string;
    email!: string;
    password!: string;
    isAdmin!: boolean;
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