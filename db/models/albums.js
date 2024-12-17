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
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    Albums.prototype.setAssociation = (models) => {
        Albums.hasMany(models.Tracks, { foreignKey: 'track_id' });
        Albums.belongsTo(models.Artists, { foreignKey: "artist_id" })
    }

    return Albums;
};