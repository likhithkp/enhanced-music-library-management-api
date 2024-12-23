module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('artists', {
      artist_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      grammy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hidden: {
        type: DataTypes.BOOLEAN,
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
      }
    })
    await queryInterface.addIndex('artists', {
      name: 'artists_artist_id_idx',
      fields: ['artist_id'],
    });
    await queryInterface.addIndex('artists', {
      name: 'artists_grammy_idx',
      fields: ['grammy'],
    });
    await queryInterface.addIndex('artists', {
      name: 'artists_hidden_idx',
      fields: ['hidden'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('artists');
    await queryInterface.removeIndex('artists', 'artists_artist_id_idx');
    await queryInterface.removeIndex('artists', 'artists_grammy_idx');
    await queryInterface.removeIndex('artists', 'artists_hidden_idx');
  },
};
