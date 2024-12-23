module.exports = (sequelize, DataTypes) => {
    const Albums = sequelize.define('albums', {
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
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            { fields: ['album_id'] },
            { fields: ['artist_id'] },
            { fields: ['hidden'] },
        ],
    });

    Albums.associate = (models) => {
        Albums.belongsTo(models.artists, {
            foreignKey: 'artist_id',
            targetKey: 'artist_id',
            onDelete: 'CASCADE'
        });
        Albums.hasMany(models.tracks, {
            foreignKey: 'album_id',
            targetKey: 'album_id',
            onDelete: 'CASCADE'
        });
        Albums.hasMany(models.favourites, {
            foreignKey: 'item_id',
            constraints: false,
            scope: { category: 'album' },
            as: 'favourites',
        });
    };

    return Albums;
};