export default function Input({ placeholder, inputName, inputType, onChange, ref }) {
  return (
        <input
        type={inputType}
        placeholder={placeholder}
        name={inputName}
        className="border-solid border border-[#1A6D12] px-4 w-full py-2 rounded-xl"
        onChange={onChange}
        ref={ref}
        />
  )
}