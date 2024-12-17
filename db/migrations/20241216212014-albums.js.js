module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('albums', {
      album_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generate UUID
        primaryKey: true,
        allowNull: false,
      },
      artist_id: {
        type: DataTypes.UUID,
        references: {
          model: 'artists',  // Reference to the artists model
          key: 'artist_id',       // The primary key in artists
        },
        allowNull: false,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('albums');
  },
};
