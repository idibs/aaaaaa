import connection from './connection'

export function getProducts(category) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    conn.query(`SELECT Nome_prod as Nome, Codigo_prod as Código, Preco_prod as Preço, Peso_prod as Peso, Quantidade_prod as Quantidade, Ml_prod as Ml, Tipo_prod as Tipo FROM Produto 
      INNER JOIN Categoria ON Produto.Id_categ = Categoria.Id_categ 
      WHERE Nome_categ = '${category}'`, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getProductsColumns() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    conn.query(`SELECT Nome_prod as Nome, Codigo_prod as Código, Preco_prod as Preço, Peso_prod as Peso, Quantidade_prod as Quantidade, Ml_prod as Ml, Tipo_prod as Tipo, Nome_categ as Categoria FROM Produto 
      INNER JOIN Categoria ON Produto.Id_categ = Categoria.Id_categ`, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getPeople(tableName) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    conn.query(`SELECT ${tableName}.*, Cep_end as CEP FROM ${tableName}
      INNER JOIN Endereco ON ${tableName}.Id_End = Endereco.Id_End`, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getClient() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    conn.query(`SELECT Nome, Email_cli as Email Logradouro_end as Rua, Numero_end as Número, Bairro_end as Bairro, Cep_end as CEP, Complemento_end as Complemento FROM Cliente
      INNER JOIN Endereco ON Cliente.Id_End = Endereco.Id_End`, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function getClientColumns() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    conn.query(`SELECT Nome, Email_cli as Email Logradouro_end as Rua, Numero_end as Número, Bairro_end as Bairro, Cep_end as CEP, Complemento_end as Complemento FROM Cliente
      INNER JOIN Endereco ON Cliente.Id_End = Endereco.Id_End`, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}

export function insertProducts(tableName, data) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`
    conn.query(query, data, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
    conn.end()
  })
}
