const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.superadmin = require("./superadmin.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.reseller = require("./resellers.model.js")(sequelize, Sequelize);
db.user = require("./users.model.js")(sequelize, Sequelize);
db.transaction = require("./transactions.model")(sequelize, Sequelize);
db.reseller_transaction = require("./reseller.transaction.model")(sequelize, Sequelize);

module.exports = db;