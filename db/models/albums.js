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
    });

    Albums.associate = (models) => {
        Albums.belongsTo(models.artists, { foreignKey: 'artist_id', targetKey: 'artist_id' });
        Albums.hasMany(models.tracks, { foreignKey: 'album_id', targetKey: 'album_id' });
    };

    return Albums;
};