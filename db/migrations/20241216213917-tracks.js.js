module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tracks', {
      track_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      album_id: {
        type: DataTypes.UUID,
        references: {
          model: 'albums',
          key: 'album_id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
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
      duration: {
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
    });
    await queryInterface.addIndex('tracks', {
      name: 'tracks_track_id_idx',
      fields: ['track_id'],
    });
    await queryInterface.addIndex('tracks', {
      name: 'tracks_album_id_idx',
      fields: ['album_id'],
    });
    await queryInterface.addIndex('tracks', {
      name: 'tracks_artist_id_idx',
      fields: ['artist_id'],
    });
    await queryInterface.addIndex('tracks', {
      name: 'tracks_hidden_idx',
      fields: ['hidden'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tracks');
    await queryInterface.removeIndex('tracks', 'tracks_track_id_idx');
    await queryInterface.removeIndex('tracks', 'tracks_album_id_idx');
    await queryInterface.removeIndex('tracks', 'tracks_artist_id_idx');
    await queryInterface.removeIndex('tracks', 'tracks_hidden_idx');
  },
};
