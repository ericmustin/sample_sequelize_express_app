var db = require('../models');
var Todo = db.Todo;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.query.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  getTodo(req,res) {
  	if (db.Sequelize.version.indexOf("5.") >= 0) {
      console.log('v5 query: ', db.Sequelize.version)
      return Todo.findByPk(req.query.todoId).then(result => console.log("SUCCESS", result)).catch(err => console.log("ERROR", err))     
  	} else {
      console.log('v4 query: ', db.Sequelize.version)
		  return Todo.findById(req.query.todoId).then(result => console.log("SUCCESS", result)).catch(err => console.log("ERROR", err)) 		
  	}
  },
  getTodoRawNull(req,res) {
    console.log('version:, ', db.Sequelize.version)
    return db.sequelize.query("SELECT * FROM todos where id='null'", {type: db.sequelize.QueryTypes.SELECT}).then(result => console.log("SUCCESS", result)).catch(err => console.log("ERROR", err)) 	
  },
  getTodoRaw(req, res) {
    console.log('version:, ', db.Sequelize.version)
    return db.sequelize.query(`SELECT * FROM todos where id='${req.query.todoId}'`, {type: db.sequelize.QueryTypes.SELECT}).then(result => console.log("SUCCESS", result)).catch(err => console.log("ERROR", err))   
  },
  getAll() {
    if (db.Sequelize.version.indexOf("5.") >= 0) {
      console.log('v5 query: ', db.Sequelize.version)
      return Todo.findAll()
    } else {
      console.log('v4 query: ', db.Sequelize.version)
      return Todo.all()
    }
  }
};