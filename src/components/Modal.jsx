import React, { useState } from 'react';

function Modal({ setPredictionResult }) {
  // Initial form data
  const initialFormData = {
    BMI: '',
    Smoking: '',
    AlcoholDrinking: '',
    Stroke: '',
    PhysicalHealth: '',
    MentalHealth: '',
    DiffWalking: '',
    Sex: '',
    AgeCategory: '',
    Race: '',
    Diabetic: '',
    PhysicalActivity: '',
    GenHealth: '',
    SleepTime: '',
    Asthma: '',
    KidneyDisease: '',
    SkinCancer: '',
  };

  // State to store form data
  const [formData, setFormData] = useState(initialFormData);

  // State for error messages
  const [errorMessages, setErrorMessages] = useState([]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validateInputs = () => {
    let errors = [];
    if (formData.BMI <= 0) {
      errors.push("BMI should be greater than 0.");
    }
    if (formData.PhysicalHealth < 0) {
      errors.push("Physical Health should not be negative.");
    }
    if (formData.MentalHealth < 0) {
      errors.push("Mental Health should not be negative.");
    }
    if (formData.SleepTime <= 0 || formData.SleepTime >= 24) {
      errors.push("Sleep Time should be between 0 and 24 hours.");
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setPredictionResult(result);
      // Reset form data after submission
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Heart Disease Prediction Input</h3>
          
          {/* Show error messages if validation fails */}
          {errorMessages.length > 0 && (
            <div className="text-red-500 mb-4">
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="block">BMI</label>
              <input
                type="number"
                name="BMI"
                value={formData.BMI}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="block">Smoking</label>
              <select
                name="Smoking"
                value={formData.Smoking}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">AlcoholDrinking</label>
              <select
                name="AlcoholDrinking"
                value={formData.AlcoholDrinking}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">Stroke</label>
              <select
                name="Stroke"
                value={formData.Stroke}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">PhysicalHealth</label>
              <input
                type="number"
                name="PhysicalHealth"
                value={formData.PhysicalHealth}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="block">MentalHealth</label>
              <input
                type="number"
                name="MentalHealth"
                value={formData.MentalHealth}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
                min="0"
              />
            </div>
            <div className="form-group">
              <label className="block">DiffWalking</label>
              <select
                name="DiffWalking"
                value={formData.DiffWalking}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">Sex</label>
              <select
                name="Sex"
                value={formData.Sex}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">AgeCategory</label>
              <select
                name="AgeCategory"
                value={formData.AgeCategory}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="0">18-24</option>
                <option value="1">25-29</option>
                <option value="2">30-34</option>
                <option value="3">35-39</option>
                <option value="4">40-44</option>
                <option value="5">45-49</option>
                <option value="6">50-54</option>
                <option value="7">55-59</option>
                <option value="8">60-64</option>
                <option value="9">65-69</option>
                <option value="10">70-74</option>
                <option value="11">75-79</option>
                <option value="12">80 or older</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">Race</label>
              <select
                name="Race"
                value={formData.Race}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="5">White</option>
                <option value="2">Black</option>
                <option value="3">Hispanic</option>
                <option value="1">Asian</option>
                <option value="4">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">Diabetic</label>
              <select
                name="Diabetic"
                value={formData.Diabetic}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="2">Yes</option>
                <option value="0">No</option>
                <option value="1">Borderline</option>
                <option value="3">Yes,During Pregnancy</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">PhysicalActivity</label>
              <select
                name="PhysicalActivity"
                value={formData.PhysicalActivity}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">GenHealth</label>
              <select
                name="GenHealth"
                value={formData.GenHealth}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="3">Poor</option>
                <option value="1">Fair</option>
                <option value="2">Good</option>
                <option value="4">Very Good</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">SleepTime</label>
              <input
                type="number"
                name="SleepTime"
                value={formData.SleepTime}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
                min="0"
                max="24"
              />
            </div>
            <div className="form-group">
              <label className="block">Asthma</label>
              <select
                name="Asthma"
                value={formData.Asthma}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">KidneyDisease</label>
              <select
                name="KidneyDisease"
                value={formData.KidneyDisease}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block">SkinCancer</label>
              <select
                name="SkinCancer"
                value={formData.SkinCancer}
                onChange={handleChange}
                className="input input-bordered w-full mb-2"
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            {/* Repeat for other fields */}
            <div className="modal-action">
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn" onClick={() => document.getElementById("my_modal_5").close()}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Modal;
