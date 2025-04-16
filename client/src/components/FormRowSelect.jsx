import React from "react";
//import { JOB_STATUS } from "../../../utils/constants";

function FormRowSelect({ name, labelTxt, list, defaultValue = "" }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelTxt || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}>
        {list.map((status) => {
          return (
            <option key={status} value={status}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
