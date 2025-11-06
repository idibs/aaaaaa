import connection from './connection'

export function getEnsacados() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_ens as Id, 
                  Nome_ens as Nome,  
                  Peso_ens as Peso, 
                  Preco_ens as Preço,
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

export function deleteEnsacado(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM produto_ensacado WHERE Id_ens = ?;`
    conn.query(sql, [id], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createOutroProduto(produto) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO outros_produtos (Nome_out, Preco_med_out, Quantidade_out, Peso_out, Codigo_out, Descricao_out, Id_categ) 
    VALUES (?, ?, ?, ?, ?, ?, ?);`
    conn.query(sql, produto, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createPessoa(pessoa) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO pessoa (Nome_pes, Telefone_pes, Tipo_pes, Id_end) 
    VALUES (?, ?, ?, ?);`
    conn.query(sql, pessoa, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createEndereco(endereco) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO endereco (Cidade_end, Rua_end, Numero_end, Bairro_end, Cep_end, Complemento_end) 
    VALUES (?, ?, ?, ?, ?, ?);`
    conn.query(sql, endereco, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getEndereco(cep, numero) {
  const conn = connection()
  const query = `select Id_end from endereco WHERE Cep_end = ? and Numero_end = ?`
  return new Promise((resolve, reject) => {
    conn.query(query, [cep, numero], (error, results) => {
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

export function getCategoriasIdByNome(categoria) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_categ as Id
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

export function getFuncionariosByTipo(tipo) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_func as Id, 
                  Nome_func as Nome, 
                  Telefone_func as Telefone,
                  cpf_func as CPF
                FROM funcionario
                WHERE Tipo_func = ?;`
    conn.query(sql, tipo, (error, results) => {
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

export function getProdutosNomes() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Nome_prod as Nome,
                  Preco_med_prod as Preço,
                  Id_prod as Id
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

export function createEnsacado(produto) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO produto_ensacado (Codigo_ens, Nome_ens, Peso_ens, Preco_ens, Quantidade_ens, Id_prod) 
    VALUES (?, ?, ?, ?, ?, ?);`
    conn.query(sql, produto, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getPedidoProdutosByStatus(status) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                    Id_pedprod AS Id,
                    Nome_pes AS Cliente,
                    Nome_out AS Nome_Produto,
                    Nome_ens AS Nome_Cereal,
                    Data_pedprod AS Data,
                    Quantidade_pedprod AS Quantidade,
                    Peso_total_pedprod AS Peso_total,
                    Valor_total_pedprod AS Valor_total,
                    Metodo_pagamento_pedprod AS Pagamento
                FROM pedido_produto pp
                INNER JOIN pessoa ON pp.Id_pes = pessoa.Id_pes
                LEFT JOIN produto_ensacado ps ON pp.Id_ens = ps.Id_ens
                LEFT JOIN outros_produtos op ON pp.Id_out = op.Id_out
                WHERE Status_pedprod = ?;`
    conn.query(sql, [status], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getPedidoProdutosByCarga(id_ped) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                    Id_pedprod AS Id,
                    Nome_pes AS Cliente,
                    Nome_out AS Nome_Produto,
                    Nome_ens AS Nome_Cereal,
                    Data_pedprod AS Data,
                    Quantidade_pedprod AS Quantidade,
                    Peso_total_pedprod AS Peso_total,
                    Valor_total_pedprod AS Valor_total,
                    Metodo_pagamento_pedprod AS Pagamento
                FROM pedido_produto pp
                INNER JOIN pessoa ON pp.Id_pes = pessoa.Id_pes
                LEFT JOIN produto_ensacado ps ON pp.Id_ens = ps.Id_ens
                LEFT JOIN outros_produtos op ON pp.Id_out = op.Id_out
                WHERE Id_ped = ?;`
    conn.query(sql, [id_ped], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getPedidos() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                    Id_ped as Id,
                    Valor_total_ped as Valor_total,
                    Peso_total_ped as Peso_total,
                    Data_entrega_ped as Data_entregue,
                    c.código_cam as Caminhão
                FROM pedido p
                INNER JOIN caminhao c ON c.Id_cam = p.Id_cam;`
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
