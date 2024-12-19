module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.ENUM('admin', 'editor', 'viewer'),
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
    await queryInterface.addIndex('users', {
      name: 'users_user_id_idx',
      fields: ['user_id'],
    });
    await queryInterface.addIndex('users', {
      name: 'users_email_idx',
      fields: ['email'],
    });
    await queryInterface.addIndex('users', {
      name: 'users_role_idx',
      fields: ['role'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.removeIndex('users', 'users_user_id_idx');
    await queryInterface.removeIndex('users', 'users_email_idx');
    await queryInterface.removeIndex('users', 'users_role_idx');
  },
};
