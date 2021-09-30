//Responsabilidade do atendimentos = controlar rotas;

/* app.get pega a requisição do localhost:3000,
Quando for na rota /, execute a função:  res.send 
- O express devolve 2 coisas: req (requisição que a pessoa está enviando) e res (o que estamos devolvendo)
É necessário exportar o app.get através do método module.exports */


module.exports = app => {
    app.get('/atendimentos',(req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))

    app.post('/atendimentos',(req, res) => {
        console.log(req.body)
        res.send('Você está na rota de atendimentos e está realizando um POST')
    })
}