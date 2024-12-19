module.exports = (sequelize, DataTypes) => {
    const Artists = sequelize.define('artists', {
        artist_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        grammy: {
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
    });

    Artists.associate = (models) => {
        Artists.hasMany(models.albums, {
            foreignKey: 'artist_id',
            targetKey: 'artist_id'
        });
        Artists.hasMany(models.tracks, {
            foreignKey: 'artist_id',
            targetKey: 'artist_id'
        });
        Artists.hasMany(models.favourites, {
            foreignKey: 'item_id',
            constraints: false,
            scope: { category: 'artist' },
            as: 'favourites',
        });
    };

    return Artists;
};