module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('artists', {
      artist_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      grammy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('artists');
  },
};
