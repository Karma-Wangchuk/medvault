import React, { useEffect, useState } from "react";
import "./data.css";

const Data = ({ state }) => {
  const [lists, setLists] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const listDetails = async () => {
      try {
        const allRecords = await contract.getAllRecords();
        setLists(allRecords);
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.formattedTimestamp}</td>
                  <td>{data.name}</td>
                  <td>{data.ageNew}</td>
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
