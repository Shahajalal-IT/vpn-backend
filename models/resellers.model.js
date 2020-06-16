/**
 * Reseller Model-----------------------
*/

module.exports = (sequelize, Sequelize) => {
    const Reseller = sequelize.define("resellers", {
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
        role: {
            type: Sequelize.STRING,
            allowNull: false
        },
        balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
        },
        ios_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        android_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        creator: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        admin_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "admins",
                key:   "id"
            }
        },
    });

    return Reseller;
};