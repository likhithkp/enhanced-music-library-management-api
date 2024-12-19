module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tracks', {
      track_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generate UUID
        primaryKey: true,
        allowNull: false,
      },
      album_id: {
        type: DataTypes.UUID,
        references: {
          model: 'albums',  // Reference to the albums model
          key: 'album_id',       // The primary key in albums
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      artist_id: {
        type: DataTypes.UUID,
        references: {
            model: 'artists',  // Reference to the artists model
            key: 'artist_id',       // The primary key in artists
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tracks');
  },
};
