//Responsabilidade do index = Subir o servidor no ar;

/* Invés de exportar o express direto, exporta-se o file customExpress, 
que exporta o módulo c/ a arrow function: */
const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')

        Tabelas.init(conexao)
        
        //Declara que o app = function customExpress
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
        /* Subir no servidor
                Porta, Função  */
    }
})

