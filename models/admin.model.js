/**
 * Admin Model-----------------------
*/

module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
        user: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        site_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        site_title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
        },
        creator: {
            type: Sequelize.INTEGER,
            references: {
                model: "superAdmins",
                key:   "id"
            }
        },
    });

    return Admin;
};