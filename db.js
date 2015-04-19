
var dataBase = {
  database: 'chat',
  user: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
};


var Sequelize = require('sequelize');
var sequelize = new Sequelize(dataBase.database, dataBase.user, dataBase.password,
      {
        host: dataBase.host,
        port: dataBase.port,
        dialect:  dataBase.dialect
      }
);


var Users = sequelize.define('users', {
    id_user: {type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    username:Sequelize.STRING ,
    pass:Sequelize.STRING
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
);


module.exports = {
  sequelize: sequelize,
  models: {
    Users: Users,
  }
};
