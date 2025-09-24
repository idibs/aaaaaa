import connection from './connection'

export function getProdutos(Nome_categ) {
  const conn = connection()
  const query = `SELECT Nome_prod as Nome, Codigo_prod as Código, Preco_prod as Preço, Peso_prod as Peso, Quantidade_prod as Quantidade, Ml_prod as Ml, Tipo_prod as Tipo FROM Produto 
      INNER JOIN Categoria ON Produto.Id_categ = Categoria.Id_categ 
      WHERE Nome_categ = ?`
  return new Promise((resolve, reject) => {
    conn.query(query, [Nome_categ], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getPessoas(Funcao_pes) {
  const conn = connection()
  const query = `SELECT Nome_pes, Telefone_pes, Email_pes, Senha_pes, Cpf_pes, Cep_end FROM Pessoa 
      INNER JOIN Endereco ON Produto.Id_end = Endereco.Id_end 
      WHERE Funcao_pes = ?`
  return new Promise((resolve, reject) => {
    conn.query(query, [Funcao_pes], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getColunasProdutos() {
  const conn = connection()
  const query = `SELECT Nome_prod as Nome, Codigo_prod as Código, Preco_prod as Preço, Peso_prod as Peso, Quantidade_prod as Quantidade, Ml_prod as Ml, Tipo_prod as Tipo, Nome_categ as Categoria FROM Produto 
      INNER JOIN Categoria ON Produto.Id_categ = Categoria.Id_categ`
  return new Promise((resolve, reject) => {
    conn.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getColunasPessoas() {
  const conn = connection()
  const query = `SELECT Nome_pes, Telefone_pes, Email_pes, Senha_pes, Cpf_pes, Funcao_pes, Cep_end, Logradouro_end, Numero_end, Bairro_end, Complemento_end FROM Pessoa
                INNER JOIN Endereco ON Endereo.Id_end = Pessoa.Id_end`
  return new Promise((resolve, reject) => {
    conn.query(query, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}
