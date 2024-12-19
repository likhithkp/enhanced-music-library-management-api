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
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['email'] },
      { fields: ['role'] },
    ],
  }); 

  Users.associate = (models) => {
    Users.hasMany(models.favourites, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
      onDelete: 'CASCADE'
    });
  }

  return Users;
};