import { IoMdClose } from 'react-icons/io'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopupCriarVenda({ showModal, onClose }) {
  if (!showModal) return null

  const columns = ['Cep', 'Cidade', 'Bairro', 'Rua', 'Numero', 'Complemento']
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 5
  const [dropdownOpenCategorias, setDropdownOpenCategorias] = useState(false)
  const [dropdownOpenMetodos, setDropdownOpenMetodos] = useState(false)
  const [dropdownOpenProdutos, setDropdownOpenProdutos] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [formValues, setFormValues] = useState({}) // <-- persist valores por coluna
  const [error, setError] = useState(null)
  const dropdownRef = useRef(null)

  const CategoriasProdutos = ['Cereais', 'Ração', 'Variedade']
  const MetodoDePagamento = ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto']

  useEffect(() => {
    setPage(1)
    setFormValues({})
  }, [])

  useEffect(() => {
    if (formValues.Categoria === 'Cereais') {
      window.api.getEnsacados().then((data) => {
        setProdutos(data)
      })
    } else if (formValues.Categoria === 'Ração' || formValues.Categoria === 'Variedade') {
      window.api.getOutrosProdutosByCategoria(formValues.Categoria).then((data) => {
        setProdutos(data)
      })
    }
  }, [formValues.Categoria])

  const totalPages = Math.ceil(columns.length / PAGE_SIZE)
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = columns.slice(startIdx, endIdx)

  const inputNumbers = ['Telefone', 'Número', 'Cep']

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/40 z-10"></div>

      {/* Popup principal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">
          Novo Pedido de Produto
        </h1>

        <div className="flex flex-col justify-between h-140">
          <div>
            <div className="mt-7 flex flex-col px-30 h-90 w-full">
              {/* PÁGINA 1: dropdowns (método, categoria, produto) + Cliente, Quantidade, Valor Unitário */}
              {page === 1 && (
                <>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpenMetodos((v) => !v)}
                      className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpenMetodos}
                      type="button"
                    >
                      {formValues.Metodo || 'Selecione o Método de Pagamento'}
                      <IoIosArrowDown className="text-sm" />
                    </button>

                    {dropdownOpenMetodos && (
                      <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                        {MetodoDePagamento.map((metodo) => (
                          <button
                            key={metodo}
                            className="block w-full text-left px-4 py-2 hover:bg-green-900"
                            onClick={() => {
                              setFormValues((prev) => ({ ...prev, Metodo: metodo }))
                              setDropdownOpenMetodos(false)
                            }}
                          >
                            {metodo}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative mt-3" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpenCategorias((v) => !v)}
                      className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpenCategorias}
                      type="button"
                    >
                      {formValues.Categoria || 'Selecione a Categoria do Produto'}
                      <IoIosArrowDown className="text-sm" />
                    </button>

                    {dropdownOpenCategorias && (
                      <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                        {CategoriasProdutos.map((categoria) => (
                          <button
                            key={categoria}
                            className="block w-full text-left px-4 py-2 hover:bg-green-900"
                            onClick={() => {
                              setFormValues((prev) => ({ ...prev, Categoria: categoria }))
                              setDropdownOpenCategorias(false)
                            }}
                          >
                            {categoria}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {formValues.Categoria && (
                    <div className="relative mt-3" ref={dropdownRef}>
                      <button
                        onClick={() => setDropdownOpenProdutos((v) => !v)}
                        className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl flex justify-between items-center"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpenProdutos}
                        type="button"
                      >
                        {formValues.produtoNome || 'Selecione o Produto'}
                        <IoIosArrowDown className="text-sm" />
                      </button>

                      {dropdownOpenProdutos && (
                        <div className="absolute right-0 mt-2 w-full bg-[#044a23] text-white rounded shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30 overflow-hidden">
                          {produtos.map((produto) => (
                            <button
                              key={produto.Id}
                              className="block w-full text-left px-4 py-2 hover:bg-green-900"
                              onClick={() => {
                                // garantir que preço e quantidade sejam números (evita concatenação)
                                const precoNum = Number(produto.Preço) || 0
                                const qtdNum = Number(produto.Quantidade) || 0

                                if (formValues.Categoria === 'Cereais') {
                                  setFormValues((prev) => ({
                                    ...prev,
                                    ProdutoEnsacado: produto.Id,
                                    produtoPreco: precoNum,
                                    produtoQuantidade: qtdNum,
                                    produtoNome: produto.Nome,
                                    produtoPeso: produto.Peso
                                  }))
                                } else {
                                  setFormValues((prev) => ({
                                    ...prev,
                                    OutroProduto: produto.Id,
                                    produtoPreco: precoNum,
                                    produtoQuantidade: qtdNum,
                                    produtoNome: produto.Nome,
                                    produtoPeso: produto.Peso
                                  }))
                                }
                                setDropdownOpenProdutos(false)
                              }}
                            >
                              {produto.Nome}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* campos que agora ficam na página 1 */}
                  <input
                    type="text"
                    placeholder="Cliente"
                    value={formValues.Cliente ?? ''}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, Cliente: e.target.value }))
                    }
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="number"
                    disabled={formValues.produtoQuantidade == null}
                    min={1}
                    placeholder="Quantidade"
                    value={formValues.Quantidade ?? ''}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, Quantidade: e.target.value }))
                    }
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="number"
                    step="0.01"
                    disabled={formValues.produtoPreco == null}
                    placeholder="Valor Unitário"
                    value={formValues.ValorUnitario ?? ''}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, ValorUnitario: e.target.value }))
                    }
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />
                </>
              )}

              {/* PÁGINA 2: map dos inputs do endereço (apenas página 2) */}
              {page === 2 && (
                <>
                  {/* Inputs explícitos de endereço */}
                  <input
                    type="number"
                    placeholder="Cep"
                    value={formValues.Cep ?? ''}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, Cep: Number(e.target.value) }))
                    }
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Cidade"
                    value={formValues.Cidade ?? ''}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, Cidade: e.target.value }))}
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Bairro"
                    value={formValues.Bairro ?? ''}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, Bairro: e.target.value }))}
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Rua"
                    value={formValues.Rua ?? ''}
                    onChange={(e) => setFormValues((prev) => ({ ...prev, Rua: e.target.value }))}
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="number"
                    placeholder="Numero"
                    value={formValues.Numero ?? ''}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        Numero: e.target.value === '' ? '' : Number(e.target.value)
                      }))
                    }
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Complemento"
                    value={formValues.Complemento ?? ''}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, Complemento: e.target.value }))
                    }
                    className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
                  />
                </>
              )}

              {error && <div className="text-red-600 mt-2 px-2">{error}</div>}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-end w-full px-30 mt-2">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`${
                    page === 1
                      ? 'hidden'
                      : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'
                  }`}
                  text={<IoMdArrowRoundBack />}
                />
                <Button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`${
                    page === totalPages
                      ? 'hidden'
                      : 'text-[#1A6D12] border-solid border border-[#1A6D12] hover:bg-[#ececec]'
                  }`}
                  text={<IoMdArrowRoundForward />}
                />
              </div>
            )}
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-center">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={() => {
                // validação final antes de salvar
                const quantidade = Number(formValues.Quantidade) || 0
                const max = Number(formValues.produtoQuantidade) || undefined
                const minUnit = formValues.produtoPreco
                  ? Number(formValues.produtoPreco) * 1.15
                  : undefined
                const valor = Number(formValues.ValorUnitario) || 0
                const peso = Number(formValues.produtoPeso) || 0

                setError(null)

                if (!formValues.Metodo || !formValues.Categoria || !formValues.produtoNome) {
                  setError('Preencha método, categoria e produto.')
                  return
                }
                if (!formValues.Cliente || formValues.Cliente.trim() === '') {
                  setError('Cliente é obrigatório.')
                  return
                }
                if (!quantidade || quantidade < 1 || (max && quantidade > max)) {
                  setError(`Quantidade inválida. Deve estar entre 1 e ${max || '∞'}.`)
                  return
                }
                if (minUnit && valor < minUnit) {
                  setError(`Valor unitário inválido. Mínimo: ${minUnit.toFixed(2)}.`)
                  return
                }

                const pesoTotal = peso * quantidade
                const valorTotal = quantidade * valor
                const date = new Date()
                const dataAgr = date.toISOString().split('T')[0] // Formato YYYY-MM-DD

                const payload = {
                  Cliente: formValues.Cliente,
                  Metodo: formValues.Metodo,
                  ProdutoEnsacado: formValues.ProdutoEnsacado || null,
                  OutroProduto: formValues.OutroProduto || null,
                  Quantidade: quantidade,
                  ValorTotal: valorTotal,
                  PesoTotal: pesoTotal,
                  Data: dataAgr,
                  Endereco: {
                    Cep: formValues.Cep || null,
                    Cidade: formValues.Cidade || null,
                    Bairro: formValues.Bairro || null,
                    Rua: formValues.Rua || null,
                    Numero: formValues.Numero || null,
                    Complemento: formValues.Complemento || null
                  }
                }

                window.api
                  .createPedidoProduto(payload)
                  .then((result) => {
                    onClose()
                  })
                  .catch((err) => {
                    setError(`Erro ao criar pedido: ${err.message}`)
                  })
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
