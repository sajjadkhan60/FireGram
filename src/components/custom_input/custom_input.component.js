import "./custom_input.css";
function CustomInput({ title, ...otherProps }) {
  return (
    <div className="custom_input_component">
      <label>{title}</label>
      <input {...otherProps} />
    </div>
  );
}

export default CustomInput;
