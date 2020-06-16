module.exports = {
    HOST: '159.89.51.6',
    USER: 'fixnetwork',
    PASSWORD: 'fix1network',
    DB: 'fixnetworkspanel',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};