import { DataTypes, Sequelize, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {

};

User.init({
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
    
}, {
  sequelize,
  tableName: 'user'
});

export default User;