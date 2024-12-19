module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('favourites', {
      favorite_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    })
    await queryInterface.addIndex('favourites', {
      name: 'favourites_favorite_id_idx',
      fields: ['favorite_id'],
    });
    await queryInterface.addIndex('favourites', {
      name: 'favourites_category_idx',
      fields: ['category'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('favourites');
    await queryInterface.removeIndex('favourites', 'favourites_favorite_id_idx');
    await queryInterface.removeIndex('favourites', 'favourites_category_idx');
  },
};
