'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,

    }
  }, {tableName: 'todos', freezeTableName: true});

  return Todo;
};