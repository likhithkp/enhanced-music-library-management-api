module.exports = (sequelize, DataTypes) => {
    const Tracks = sequelize.define('tracks', {
        track_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Auto-generate UUID
            primaryKey: true,
            allowNull: false,
        },
        album_id: {
            type: DataTypes.UUID,
            references: {
                model: 'albums',  // Reference to the albums model
                key: 'album_id',       // The primary key in albums
            },
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
        duration: {
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

    Tracks.associate = (models) => {
        Tracks.belongsTo(models.albums, {
            foreignKey: "album_id",
            targetKey: "album_id",
            onDelete: 'CASCADE',
        }),
        Tracks.belongsTo(models.artists, {
            foreignKey: "artist_id",
            targetKey: "artist_id",
            onDelete: 'CASCADE',
        }),
        Tracks.hasMany(models.favourites, {
            foreignKey: 'item_id',
            constraints: false,
            scope: { category: 'track' },
            as: 'favourites',
        });
    };

    return Tracks;
};