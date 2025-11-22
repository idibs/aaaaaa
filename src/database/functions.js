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

export function adicionaPrecoPesoCarga(idCarga, Preco, Peso) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pedido SET Valor_total_ped = Valor_total_ped + ?, Peso_total_ped = Peso_total_ped + ? WHERE Id_ped = ?;`

    conn.query(sql, [Preco, Peso, idCarga], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function deletePedidoProduto(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM pedido_produto WHERE Id_pedprod = ?;`
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

export function editPessoa(pessoa) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pessoa SET Nome_pes = ?, Telefone_pes = ?, Tipo_pes= ?, Id_end = ? 
    WHERE Id_pes = ?;`
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

export function editCarga(carga) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pedido SET Id_cam = ?, Data_entrega_ped = ? WHERE Id_ped = ?;`
    conn.query(sql, carga, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getPessoaEndereco(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `select  Nome_pes as Nome,
Telefone_pes as Telefone,
Cidade_end as Cidade,
Rua_end as Rua,
Numero_end as Numero,
Bairro_end as Bairro,
Cep_end as Cep,
Complemento_end as Complemento
from pessoa
INNER JOIN endereco ON pessoa.Id_end = endereco.Id_end
WHERE Id_pes = ?;`
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

export function editFuncionario(funcionario) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE funcionario SET Nome_func = ?, Telefone_func = ?, cpf_func = ?, Tipo_func = ?, Id_car = ? 
    WHERE Id_func = ?;`
    conn.query(sql, funcionario, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createFuncionario(funcionario) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO funcionario (Nome_func, Telefone_func, cpf_func, Tipo_func, Id_car) 
    VALUES (?, ?, ?, ?, ?);`
    conn.query(sql, funcionario, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function deleteFuncionario(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM funcionario WHERE Id_func = ?;`
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

export function finalizaPedido(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pedido_produto SET Status_pedprod = "Finalizado" WHERE Id_pedprod = ?;`
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

export function updateValorPedido(id, valorTotal) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pedido_produto SET Status_pedprod = "Finalizado", Valor_total_pedprod = ? WHERE Id_pedprod = ?;`
    conn.query(sql, [valorTotal, id], (error, results) => {
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

export function deletePessoa(id, pedidoExiste) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    if (!pedidoExiste || pedidoExiste.length === 0) {
      const sql = `DELETE FROM pessoa WHERE Id_pes = ?;`
      conn.query(sql, [id], (error, results) => {
        conn.end()
        if (error) reject(error)
        else resolve(results)
      })
      return
    }

    const sqlUpdate = `UPDATE pedido_produto SET Id_pes = NULL WHERE Id_pes = ? AND Status_pedprod = "Finalizado";`
    const sqlDeletePedidos = `DELETE FROM pedido_produto WHERE Id_pes = ?;`
    const sqlDeletePessoa = `DELETE FROM pessoa WHERE Id_pes = ?;`

    conn.query(sqlUpdate, [id], (err) => {
      if (err) {
        conn.end()
        return reject(err)
      }
      conn.query(sqlDeletePedidos, [id], (err2) => {
        if (err2) {
          conn.end()
          return reject(err2)
        }
        conn.query(sqlDeletePessoa, [id], (err3, results) => {
          conn.end()
          if (err3) return reject(err3)
          resolve(results)
        })
      })
    })
  })
}

export function getPedidoProdutosByPessoa(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM pedido_produto Where Id_pes = ?`
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
                  preco_med_out as Preço,
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

export function deleteOutroProduto(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM outros_produtos WHERE Id_out = ?;`
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
                  cpf_func as CPF,
                  Tipo_func as Tipo,
                  Nome_car as Cargo
                FROM funcionario
                INNER JOIN cargo ON cargo.Id_car = funcionario.Id_car
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

export function getPessoaByNome(nome) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_pes
                from pessoa
                WHERE Nome_pes = ?;`
    conn.query(sql, [nome], (error, results) => {
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
                WHERE Tipo_pes LIKE ?;`
    conn.query(sql, [`%${tipo}%`], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function updateProdutoPrecoQuantidade(id, novoPreco, novaQuantidade) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE produto SET Preco_med_prod = ?, Quantidade_prod = ? WHERE Id_prod = ?;`
    conn.query(sql, [novoPreco, novaQuantidade, id], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createProdutoBase(produto) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO produto (Nome_prod, Preco_med_prod, Quantidade_prod, Descricao_prod, Id_categ, Codigo_prod)
    VALUES (?,?,?,?,?,?)`

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

export function getProdutosNomes() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Nome_prod as Nome,
                  Preco_med_prod as Preço,
                  Quantidade_prod as Quantidade,
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
                    Id_ped AS Carga,
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

export function getOutroProdutoByNome(nome) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_out as Id,
                  Preco_med_out as Preço
                FROM outros_produtos
                WHERE Nome_out = ?;`
    conn.query(sql, [nome], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getEnsacadoByNome(nome) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                  Id_ens as Id,
                  Preco_ens as Preço
                FROM produto_ensacado
                WHERE Nome_ens = ?;`
    conn.query(sql, [nome], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createPedidoProduto(pedidoProduto) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO pedido_produto (Id_pes, Id_ens, Id_out, Data_pedprod, Quantidade_pedprod, Peso_total_pedprod, Valor_total_pedprod, Metodo_pagamento_pedprod, Status_pedprod, Id_end) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    conn.query(sql, pedidoProduto, (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function getCargas() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                    Id_ped AS Id
                FROM pedido;`
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

export function atribuirCarga(id_venda, id_carga) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pedido_produto SET Id_ped = ? WHERE Id_pedprod = ?;`
    conn.query(sql, [id_carga, id_venda], (error, results) => {
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

export function getCaminhoes() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                    Id_cam AS Id,
                    Código_cam AS Código
                FROM caminhao;`
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

export function getPedidos() {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
                    Id_ped as Carga,
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

export function editCereal(produto) {
  // ORDEM: [Nome, Preço, Quantidade, Peso, Código, Id]
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE produto_ensacado 
                 SET Nome_ens = ?, Preco_ens = ?, Quantidade_ens = ?, Peso_ens = ?, Codigo_ens = ? 
                 WHERE Id_ens = ?;`
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

export function deletePedidoProdutoFromCarga(id, Valor_total, Peso_total) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sqlDelete = `UPDATE pedido_produto SET Id_ped = NULL WHERE Id_pedprod = ?;`
    const sqlUpdateCarga = `UPDATE pedido SET Valor_total_ped = Valor_total_ped - ?, Peso_total_ped = Peso_total_ped - ? WHERE Id_ped = (SELECT Id_ped FROM pedido_produto WHERE Id_pedprod = ?);`
    conn.query(sqlUpdateCarga, [Valor_total, Peso_total, id], (err) => {
      if (err) {
        conn.end()
        return reject(err)
      }
      conn.query(sqlDelete, [id], (error, results) => {
        conn.end()
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  })
}

export function deleteCarga(id) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM pedido WHERE Id_ped = ?;`
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

export function retirarPrecoPesoCarga(idCarga, Preco, Peso) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE pedido SET Valor_total_ped = Valor_total_ped - ?, Peso_total_ped = Peso_total_ped - ? WHERE Id_ped = ?;`
    conn.query(sql, [Preco, Peso, idCarga], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function createCarga(caminhao) {
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO pedido (Id_cam, Valor_total_ped, Peso_total_ped)
    VALUES (?, 0, 0);`
    conn.query(sql, [caminhao], (error, results) => {
      conn.end()
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export function editOutroProduto(produto) {
  // ORDEM: [Nome, Preço, Quantidade, Peso, Código, Descrição, Id]
  const conn = connection()
  return new Promise((resolve, reject) => {
    const sql = `UPDATE outros_produtos
                  SET Nome_out = ?, Preco_med_out = ?, Quantidade_out = ?, Peso_out = ?, Codigo_out = ?, Descricao_out = ?, Id_categ = ?
                  WHERE Id_out = ?;`
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
