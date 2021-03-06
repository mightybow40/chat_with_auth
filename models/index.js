module.exports = function(){
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('webchat', 'root', '12345', {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false
    });
    return {s: sequelize, S: Sequelize};
};