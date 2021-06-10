const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

//quando tem um unico item na arrow function, ela não colocar as chaves em volta
module.exports = () =>
    //configurar conexão com o banco
    open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })
    //o open deve estar dentro
    //de uma estrutura de função para funcionar

