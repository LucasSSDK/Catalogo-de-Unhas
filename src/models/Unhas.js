const { Sequelize } = require("sequelize");
const database = require("../database/bd");


const Unhas = database.sequelize.define(
    "unhas",
    {
        id: {
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome:{
            type: Sequelize.STRING ,
            allowNull: false,
        },

        caracteristicas: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imagem:{
            type: Sequelize.STRING,
          allowNull: false,
        },
    },
{
    freezeTableName: true,
    timestamp: false,
    createdAt: false,
    updatedAt: false,
}

);
const initTable = async () =>{
    await Unhas.sync();
  }
  
  initTable();

module.exports = Unhas; //exportar o Unhas