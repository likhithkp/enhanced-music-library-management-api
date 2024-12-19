module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('albums', {
      album_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      artist_id: {
        type: DataTypes.UUID,
        references: {
          model: 'artists',
          key: 'artist_id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      year: {
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
    await queryInterface.addIndex('albums', {
      name: 'albums_album_id_idx',
      fields: ['album_id'],
    });
    await queryInterface.addIndex('albums', {
      name: 'albums_artist_id_idx',
      fields: ['artist_id'],
    });
    await queryInterface.addIndex('albums', {
      name: 'albums_hidden_idx',
      fields: ['hidden'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('albums');
    await queryInterface.removeIndex('albums', 'albums_album_id_idx');
    await queryInterface.removeIndex('albums', 'albums_artist_id_idx');
    await queryInterface.removeIndex('albums', 'albums_hidden_idx');
  },
};
