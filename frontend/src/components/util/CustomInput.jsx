import { BiErrorCircle } from "react-icons/bi";

function CustomInput({ label, name, value, onChange, error }) {
  return (
    <div className={`row ${error ? 'has-error' : ''}`}>
      <label>{label}</label>
      <div className="input-container">
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'input-error' : ''}
        />
        {error && <BiErrorCircle className="error-icon" />}
      </div>
    </div>
  )
}
export default CustomInput