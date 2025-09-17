export default function DesignBotao({ onClick, className, text }) {
    return (
        <button onClick={onClick} className={`rounded-xl py-2 px-4 cursor-pointer ${className}`}>
            {text}
        </button>
    )
}
