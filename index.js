//Chamando módulos no express
const express = require('express')

const app = express()


/* Subir no servidor:
          porta, função() */
app.listen(3000, () => console.log('servidor rodando na porta 3000'))


/* app.get pega a requisição do localhost:300,
quando for na rota /, execute a função() */
app.get('/atendimentos',(req, res) => res.send('Você está na rota de atendimento  e está realizando um GET'))
//O express devolve 2 coisas: req(requisição que a pessoa está enviando) e res(o que estamos devolvendo)