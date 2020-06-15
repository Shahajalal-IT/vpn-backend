/**
 * User Model-----------------------
*/

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        pin: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone_unique: {
            type: Sequelize.STRING,
        },
        creator: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        creator_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        activated_at: {
            type: Sequelize.DATE
        },
        expired_at: {
            type: Sequelize.DATE
        },
        type: {
            type: Sequelize.INTEGER,
        },
        active: {
            type: Sequelize.INTEGER,
        },
        notes: {
            type: Sequelize.STRING,
        },
        device: {
            type: Sequelize.STRING,
        },
        admin_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "admins",
                key:   "id"
            }
        },
    });

    return Users;
};