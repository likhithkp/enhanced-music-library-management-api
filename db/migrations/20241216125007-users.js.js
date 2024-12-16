module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
        allowNull: false,
      }
    },{
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
