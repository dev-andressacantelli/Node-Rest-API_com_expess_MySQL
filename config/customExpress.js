//Responsabilidade do customExpress = configurar o servidor, executar alterações;

const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express() //Cria a variável app

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    consign() //Configura a variável app
        .include('controllers')
        .into(app)
    
    return app //Retorna a variável app
}
