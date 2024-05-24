import React, { useEffect, useState } from "react";
import "./data.css";
import { ethers } from "ethers"; // Import ethers.js to handle BigNumber conversion

const Data = ({ state }) => {
  const [lists, setLists] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const listDetails = async () => {
      try {
        const allRecords = await contract.getAllRecords();
        const formattedRecords = allRecords.map(record => ({
          recordId: record.recordId.toNumber(), // Convert BigNumber to number
          timestamp: new Date(record.timestamp.toNumber() * 1000).toLocaleString(), // Convert and format timestamp
          name: record.name,
          age: record.age.toNumber(), // Convert BigNumber to number
          gender: record.gender,
          bloodType: record.bloodType,
          allergies: record.allergies,
          diagnosis: record.diagnosis,
          treatment: record.treatment
        }));
        setLists(formattedRecords);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      }
    };
    contract && listDetails();
  }, [contract]);

  const deleteHandler = async (e, data) => {
    if (window.confirm("Do you want to delete the record?")) {
      try {
        await contract.deleteRecord(data.recordId);
        console.log("Data deleted");
        setLists((prevLists) =>
          prevLists.filter((item) => item.recordId !== data.recordId)
        );
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record");
      }
    } else {
      console.log("Data not deleted");
    }
  };

  return (
    <>
      {lists.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Date and Time</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Allergies</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((data, index) => (
                <tr key={data.recordId}>
                  <td>{data.recordId}</td>
                  <td>{data.timestamp}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.gender}</td>
                  <td>{data.bloodType}</td>
                  <td>{data.allergies}</td>
                  <td>{data.diagnosis}</td>
                  <td>{data.treatment}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={(e) => deleteHandler(e, data)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Connect the account</h1>
      )}
    </>
  );
};

export default Data;
