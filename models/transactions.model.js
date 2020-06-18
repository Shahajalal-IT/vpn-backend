/**
 * Transactions Model-----------------------
 */
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define("transactions", {
        given_by: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        given_by_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        given_to: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        previous_balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        current_balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        transaction_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        notes: {
            type: Sequelize.STRING
        },
        admin_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "admins",
                key:   "id"
            }
        },
    });

    sequelizePaginate.paginate(Transactions)
    return Transactions;
};