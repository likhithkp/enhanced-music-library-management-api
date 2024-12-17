module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
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
        unique: true,
      },
    }, {
        // Disable Sequelize's default timestamps
        timestamps: true,
        // Specify custom column names for the timestamps
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Users;
  };