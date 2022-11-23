import React from 'react';
import useForm from '../hooks/useForm';

function InputForm() {
  // TO-DO: Add API call to get list of clients
  // **PRIO** TO-DO: Create the submit handler to send data to main.js -> See TO-DOs in main.js
  const { values, errors, handleChange, handleSubmit, handleBlur } = useForm(() => {}, { 'type': 'pdf' });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Report Type: </label>
        <select name="type" value={values['type'] || ''} onChange={handleChange} onBlur={handleBlur}>
          <option value="pdf" selected={true}>Annual report</option>
          <option value="xlsx">Weekly report</option>
        </select>
        { errors.type && <p>Error: { errors.type }</p> }
        <label htmlFor="date">Date: </label>
        <input type="date" name="date" value={values['date'] || ''} onChange={handleChange} onBlur={handleBlur} />
        { errors.date && <p>Error: { errors.date }</p> }
      </form>
    </div>
  );
}

export default InputForm;