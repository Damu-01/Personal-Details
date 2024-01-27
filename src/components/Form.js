import React, { useState } from 'react'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    weekdays: [],
    gender: '',
    dob: '',
  });

  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter(day => day !== value)) : value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (selectedRow !== null) {
      // Update existing row
      const updatedTableData = [...tableData];
      updatedTableData[selectedRow] = { ...formData };
      setTableData(updatedTableData);
      setSelectedRow(null);
      setIsModalOpen(false);
    } else {
      // Add new row
      setTableData((prevData) => [...prevData, { ...formData }]);
    }

    // Clear the form data
    setFormData({
      name: '',
      email: '',
      contact: '',
      weekdays: [],
      gender: '',
      dob: '',
    });
  };

  const openEditModal = (index) => {
    setSelectedRow(index);
    setFormData(tableData[index]);
    setIsModalOpen(true);
  };

  const deleteRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    setFormData(formData)
  };

  return (
    <div>
      <form onSubmit={submitForm} className='form-container'>
        <fieldset>
          <legend>Personal Details</legend>
          {/* Form fields */}
          <div className='input-container'>
            <input className='input-field' type="text" name="name" placeholder='Name' value={formData.name} onChange={handleInputChange} required />

            <label htmlFor='input-field' className='input-label'>Name</label>
            <span className='input-highlight'></span>
          </div>

          <div className='input-container'>
            <input className='input-field' type="email" name="email" placeholder='Email' value={formData.email} onChange={handleInputChange} required />
            <label htmlFor='input-field' className='input-label'>Email</label>
            <span className='input-highlight'></span>
          </div>

          <div className='input-container'>
            <input className='input-field' type="tel" maxLength={10} name="contact" placeholder='Contact' value={formData.contact} onChange={handleInputChange} required />

            <label htmlFor='input-field' className='input-label'>Contact</label>
            <span className='input-highlight'></span>
          </div>
          <br />

          <label><h3>Weekday:</h3></label>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
            <div key={day}>
              <input
                type="checkbox"
                name="weekdays"
                value={day}
                checked={formData.weekdays.includes(day)}
                onChange={handleInputChange}
              />
              <label>{day}</label>
            </div>
          ))}
          <br />
          <label><h3>Gender:</h3></label>
          <div>
            <input
              type="radio"
              name="gender"
              id='male'
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleInputChange}
            />
            <label htmlFor='male'>Male</label>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              id='female'
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleInputChange}
            />
            <label htmlFor='female'>Female</label>
          </div>

          <div className='input-container'>
            <input className='input-field' type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />

            <label htmlFor='input-field' className='input-label'>Date of Birth </label>
            <span className='input-highlight'></span>
          </div>

          <br />
          <button type="submit">Submit</button>
        </fieldset>
      </form>




      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Weekday</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.contact}</td>
              <td>{row.email}</td>
              <td>{row.weekdays.join(', ')}</td>
              <td>{row.gender}</td>
              <td>{row.dob}</td>
              <td>
                <button className='Edit' onClick={() => openEditModal(index)}>Edit</button>
                <button className='Delete' onClick={() => deleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Edit Row</h2>
            <form onSubmit={submitForm}>
              {/* Render the same form fields with values from selected row */}
              {/* ... */}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
