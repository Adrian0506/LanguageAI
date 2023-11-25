import './css/Input.css'

interface InputProps {
    onChange: () => void
    placeHolder: string
    id: string
}

const Input: React.FC<InputProps> = ({ onChange, placeHolder, id }) => {
    return (
        <div className="group">
            <input id={id} type="text" onChange={onChange} required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{placeHolder}</label>
        </div>
    )
}

export default Input
