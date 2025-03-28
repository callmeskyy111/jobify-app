import React from "react";
//Dynamic/Reusable input-component

function FormRow({ type, name, labelTxt, defaultValue, placeholderTxt }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelTxt || name}
      </label>
      <input
        type={type}
        id={name}
        className="form-input"
        name={name}
        defaultValue={defaultValue || ""}
        placeholder={placeholderTxt || ""}
        required
      />
    </div>
  );
}

export default FormRow;
