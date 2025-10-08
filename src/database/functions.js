import connection from './connection'

export function getCereais() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_ens as Id, 
                  Nome_ens as Nome,  
                  Peso_ens as Peso, 
                  Quantidade_ens as Quantidade, 
                  Codigo_ens as Codigo
                FROM produto_ensacado;`
    conn.query(sql, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getOutrosProdutosByCategoria(categoria) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_out as Id, 
                  Nome_out as Nome, 
                  Quantidade_out as Quantidade, 
                  Peso_out as Peso, 
                  Codigo_out as Codigo
                FROM outros_produtos p
                INNER JOIN categoria c ON p.Id_categ = c.Id_categ
                WHERE Nome_categ = ?;`
    conn.query(sql, categoria, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getProdutos() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_prod as Id, 
                  Nome_prod as Nome, 
                  Preco_med_prod as Preço_medio,
                  Quantidade_prod as Quantidade,
                  Codigo_prod as Codigo
                  FROM produto;`
    conn.query(sql, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getPessoasByTipo(tipo) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_pes as Id,
                  Nome_pes as Nome,
                  Telefone_pes as Telefone,
                  Email_pes as Email,
                  Tipo_pes as Tipo,
                  Cidade_end as Cidade
                FROM pessoa
                INNER JOIN endereco ON endereco.Id_end = pessoa.Id_end
                WHERE Tipo_pes LIKE '%${tipo}%';`
    conn.query(sql, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getCereaisColunas(tipo) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_pes as Id,
                  Nome_pes as Nome,
                  Telefone_pes as Telefone,
                  Email_pes as Email,
                  Tipo_pes as Tipo,
                  Cidade_end as Cidade
                FROM pessoa
                INNER JOIN endereco ON endereco.Id_end = pessoa.Id_end
                WHERE Tipo_pes LIKE '%${tipo}%';`
    conn.query(sql, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getPedidoProdutos(tipo) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Nome_pes as Cliente,
                  Nome_out as Nome_Produto,
                  Nome_ens as Nome_Cereal,
                  Data_ped as Data,
                  Quantidade_pedprod as Quantidade,
                  Peso_total_pedprod as Peso_total,
                  Valor_total_pedprod as Valor_total,
                  Metodo_pagamento_pedprod as Pagamento
                FROM pedido_produto pp
                INNER JOIN pessoa ON pp.Id_pes = pessoa.Id_pes
                INNER JOIN produto_ensacado ps ON pp.Id_ens = ps.Id_ens
                INNER JOIN outros_produtos op ON pp.Id_out = op.Id_out;`
    conn.query(sql, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}
