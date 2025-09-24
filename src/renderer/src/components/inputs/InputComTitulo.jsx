import Input from './Input'

export default function InputComTitulo({ text, placeholder, inputName, inputType }) {
  return (
    <>
        <p className="text-black ps-1 mb-1b text-start">{text}</p>
        <Input
          inputType={inputType}
          placeholder={placeholder}
          inputName={inputName}
        />
    </>
  )
}