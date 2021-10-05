//Arquivo de conexao entre dados;
//Os métodos descritos aqui, serão chamados pelo atendimentos.js(CONTROLLER);

const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimento, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento