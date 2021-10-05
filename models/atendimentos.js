//Arquivo de conexão entre dados;
//Os métodos chamados aqui, serão chamados pelo atendimentos.js(CONTROLLER)

const { response } = require('express')
const moment = require('moment') //O SQL não entende o formato BR de data, portanto é necessário instalar uma lib no npm chamada "moment"
const atendimentos = require('../controllers/atendimentos')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {               //ANO-MES-DIA HR:MIN:SEG
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')           
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')//Formatando a lib moment chamada lá em cima
        
        //Validação da data, retorna um booleano
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)

        //Validação se o nome do cliente é valido, 5 é o número de caracteres válidos
        const clienteEhValido = atendimento.cliente.length >= 5

        //Objeto de validação: verifica todas as validações que precisamos checar antes de cair no if else
        const validacoes = [
            {
                nome: 'data', //nome do campo
                valido: dataEhValida, //se é valido ou não
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        //Filtrar as validações para cada campo, verifica se é válido, se não for válido, executa a mensagem de erro:
        const erros = validacoes.filter(campo => !campo.valido)

        //Verifica o tamanho da const erros, se o tamanho for 0, é false, então não existem erros, do contrário, retorna o tamanho da const erros, então é verdadeiro:      
        const existemErros = erros.length

        /*Condicional que verifica se tem erros, se tiver, retorna 400 e não busca nada no banco de dados,
        se não, executa o escopo da query: */
        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data} //Array c/ tdo o que estiver em atendimento + dataCriacao
        
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    //Faz parte da requisição GET: 
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    /* Método que faz parte da requisição GET que busca a requisição através de um ID na URL:
    localhost:3000/atendimentos/2      (o número é o id) */
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0] //feito isto para inicializar o array no 0 e devolver no postman somente o objeto {} 
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    // Método que faz parte da requisição PATCH (quando queremos alterar apenas um campo do objeto)
    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
       //é criado um array [valores, id] para delimitar q a posição 0 no array é o SET ? e a posição 1 é WHERE id=?
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }

        })

    }
}

module.exports = new Atendimento