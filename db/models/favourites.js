module.exports = (sequelize, DataTypes) => {
    const Favourites = sequelize.define('favourites', {
        favorite_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        item_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['favorite_id'] },
            { fields: ['category'] },
        ],
    });

    Favourites.associate = (models) => {
        Favourites.belongsTo(models.artists, {
            foreignKey: 'item_id',
            constraints: false,
            as: 'artist',
        });
        Favourites.belongsTo(models.albums, {
            foreignKey: 'item_id',
            constraints: false,
            as: 'album',
        });
        Favourites.belongsTo(models.tracks, {
            foreignKey: 'item_id',
            constraints: false,
            as: 'track',
        });
        Favourites.belongsTo(models.users, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
            onDelete: 'CASCADE'
        });
    };

    return Favourites;
};