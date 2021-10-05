//Responsabilidade do atendimentos = controlar rotas;

/* app.get pega a requisição do localhost:3000,
Quando for na rota /, execute a função:  res.send 
- O express devolve 2 coisas: req (requisição que a pessoa está enviando) e res (o que estamos devolvendo)
É necessário exportar o app.get através do método module.exports */

const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    //Requisição do tipo GET: pegar dados; 
    //Vai listar todos os dados inseridos na tabela;
    //No postman, selecionar GET -> localhost:3000/atendimentos
    app.get('/atendimentos',(req, res) => {
        Atendimento.lista(res)
    })

    //Localizando o atendimento através do ID; 
    //Vai listar apenas o ID inserido no final da rota;
    //No postman, selecionar GET -> localhost:3000/atendimentos/10
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id) //Pegou o valor do ID em string, converteu para inteiro;
        Atendimento.buscaPorId(id, res)
    })

    //Requisição do tipo POST: enviar dados;
    app.post('/atendimentos',(req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores. res)
    })
}