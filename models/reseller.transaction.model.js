/**
 * Reseller Transaction Model-----------------------
 */
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, Sequelize) => {
    const ResellerTransactions = sequelize.define("reseller_transaction", {
        reseller_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "resellers",
                key:   "id"
            },
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key:   "id"
            },
            allowNull: false
        },
        p_balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        c_balance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
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

    sequelizePaginate.paginate(ResellerTransactions)
    return ResellerTransactions;
};