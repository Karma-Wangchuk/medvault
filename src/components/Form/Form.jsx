import React, { useState } from "react";
import "./form.css";

const Form = ({ state }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const addRecord = async (event) => {
    event.preventDefault();

    const { contract } = state;

    try {
      await contract.addRecord(name, age, gender, bloodType, allergies, diagnosis, treatment);
      alert("Record added successfully");
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record");
    }

    setName("");
    setAge("");
    setGender("");
    setBloodType("");
    setAllergies("");
    setDiagnosis("");
    setTreatment("");
  };

  return (
    <div className="login-container">
      <form onSubmit={addRecord}>
        <h1>Patient Details</h1>
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          required
          placeholder="Age in years"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          required
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="bloodType">Blood type:</label>
        <input
          type="text"
          id="bloodType"
          name="bloodType"
          required
          placeholder="B+ve"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
        />
        <label htmlFor="allergies">Allergies:</label>
        <input
          type="text"
          id="allergies"
          name="allergies"
          required
          placeholder="Peanuts, Pollen, etc."
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
        <label htmlFor="diagnosis">Diagnosis:</label>
        <input
          type="text"
          id="diagnosis"
          name="diagnosis"
          required
          placeholder="Covid-19 Positive"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
        <label htmlFor="treatment">Treatment:</label>
        <input
          type="text"
          id="treatment"
          name="treatment"
          required
          placeholder="Paracetamol, Vitamin C, etc."
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
