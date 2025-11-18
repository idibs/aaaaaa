import { IoMdClose } from 'react-icons/io'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosArrowDown } from 'react-icons/io'
import { useState, useEffect, useRef } from 'react'
import Button from '../../botoes/DesignBotao'

export default function PopUpEditPes({ showModal, onClose, initialData }) {
  if (!showModal) return null

  const PAGE_SIZE = 5
  const [page, setPage] = useState(1)
  const [formValues, setFormValues] = useState({
    Nome: '',
    Telefone: '',
    Cep: '',
    Cidade: '',
    Bairro: '',
    Rua: '',
    Numero: '',
    Complemento: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const tiposPessoa = ['Cliente', 'Fornecedor', 'Vendedor', 'Cliente/Fornecedor']

  // busca dados e popula formValues quando o modal abre / initialData muda
  useEffect(() => {
    if (!showModal || !initialData?.Id) return
    setLoading(true)
    window.api
      .getPessoaEndereco(initialData.Id)
      .then((result) => {
        if (!result) return
        // result já deve ser objeto com chaves mapeadas
        setFormValues({
          Nome: result.Nome ?? '',
          Telefone: result.Telefone ?? '',
          Cep: result.Cep ?? '',
          Cidade: result.Cidade ?? '',
          Bairro: result.Bairro ?? '',
          Rua: result.Rua ?? '',
          Numero: result.Numero ?? '',
          Complemento: result.Complemento ?? ''
        })
      })
      .catch((err) => {
        console.error('Erro ao buscar pessoa:', err)
        setError('Erro ao carregar dados')
      })
      .finally(() => setLoading(false))
  }, [showModal, initialData])

  const totalPages = Math.max(1, Math.ceil(Object.keys(formValues).length / PAGE_SIZE))
  const startIdx = (page - 1) * PAGE_SIZE
  const endIdx = startIdx + PAGE_SIZE
  const inputs = Object.keys(formValues).slice(startIdx, endIdx)

  const handleChange = (key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#1A6D12] w-200 z-20 h-180 p-4 bg-[#fffcff] rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className="mt-4 text-4xl text-[#1A6D12] font-black py-4 text-center">
          Editar Registro
        </h1>

        <div className="flex flex-col justify-between h-140">
          <div className="mt-7 flex flex-col px-30 w-full">
            {page === 1 && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="border border-[#1A6D12] px-4 py-2 w-full rounded-xl flex justify-between items-center focus:outline-none"
                >
                  {formValues.Tipo || 'Selecione o Tipo'}
                  <IoIosArrowDown className="text-sm" />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-[#044a23] text-white rounded shadow z-30 overflow-hidden">
                    {tiposPessoa.map((tipo) => (
                      <button
                        key={tipo}
                        className="block w-full text-left px-4 py-2 hover:bg-green-900"
                        onClick={() => {
                          setDropdownOpen(false)
                          handleChange('Tipo', tipo)
                        }}
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {loading && <p className="mt-3">Carregando...</p>}

            {inputs.map((key) => (
              <input
                key={key}
                type={['Numero', 'Telefone'].includes(key) ? 'number' : 'text'}
                placeholder={key}
                value={formValues[key] ?? ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border border-[#1A6D12] px-4 py-2 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-[#1A6D12] text-gray-800 placeholder-gray-500"
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-end w-full px-30 mt-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`${page === 1 ? 'hidden' : 'text-[#1A6D12] border border-[#1A6D12]'}`}
                text={<IoMdArrowRoundBack />}
              />
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`${page === totalPages ? 'hidden' : 'text-[#1A6D12] border border-[#1A6D12]'}`}
                text={<IoMdArrowRoundForward />}
              />
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button
              className="text-white bg-[#1A6D12] hover:bg-[#145A0C] w-60"
              text="Salvar"
              onClick={() => {
                setError(null)
                // validação mínima
                if (!formValues.Nome || formValues.Nome.trim() === '') {
                  setError('Nome é obrigatório')
                  return
                }

                const payload = {
                  Nome: formValues.Nome,
                  Telefone: formValues.Telefone,
                  Tipo: formValues.Tipo,
                  Cidade: formValues.Cidade,
                  Rua: formValues.Rua,
                  Numero: formValues.Numero,
                  Bairro: formValues.Bairro,
                  Cep: formValues.Cep,
                  Complemento: formValues.Complemento,
                  Id_pes: initialData?.Id
                }

                if (window.api?.editPessoa) {
                  window.api
                    .editPessoa(payload)
                    .then(() => onClose())
                    .catch((err) => setError(err?.message || 'Erro ao salvar'))
                } else {
                  // se editPessoa não existe no preload, só logamos (evita erro)
                  console.warn('API editPessoa não disponível. payload:', payload)
                  onClose()
                }
              }}
            />
          </div>
          {error && <div className="text-red-600 mt-2 px-2">{error}</div>}
        </div>
      </div>
    </>
  )
}
