import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://quest:quest@localhost:5432/quest', {
  define: {
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    timestamps: false,
  },
});

export default sequelize;