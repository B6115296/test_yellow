import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addConstraint('cryptocurrency', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_name_constraint',
    });

    await queryInterface.addConstraint('cryptocurrency', {
      fields: ['symbol'],
      type: 'unique',
      name: 'unique_symbol_constraint',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeConstraint('cryptocurrency', 'unique_name_constraint');
    await queryInterface.removeConstraint('cryptocurrency', 'unique_symbol_constraint');
  }
};
