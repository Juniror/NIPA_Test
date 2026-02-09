import { BiErrorCircle } from "react-icons/bi";

function CustomTextArea({ label, name, value, onChange, rows, error }) {
  return (
    <div className={`row ${error ? 'has-error' : ''}`}>
      <label>{label}</label>
      <div className="input-container">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={error ? 'input-error' : ''}
        />
        {error && <BiErrorCircle className="error-icon" />}
      </div>
    </div>
  )
}
export default CustomTextArea