import { DataTypes } from 'sequelize';
import sequelize from '../database';

export interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  registred: boolean;
  emailToken: string;
}

const User = sequelize.define('ugitser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  registred: {
    type: DataTypes.BOOLEAN,
  },
  emailToken: {
    type: DataTypes.STRING,
  }
},
{
  tableName: 'user'
});

export default User;