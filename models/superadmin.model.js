/**
 * Super Admin Model-----------------------
*/

module.exports = (sequelize, Sequelize) => {
    const SuperAdmin = sequelize.define("superAdmins", {
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
    });

    return SuperAdmin;
};