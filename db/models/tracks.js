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

    Tracks.prototype.setAssociation = (models) => {
        Tracks.belongsTo(models.Albums, { foreignKey: "album_id" })
    };

    return Tracks;
};