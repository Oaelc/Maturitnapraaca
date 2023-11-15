import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';


function DeleteRezervacia({ id, datum, cas, pouzivatel_id, admin_id }) {
  const [data, setData] = useState([]);
  
    const handleDelete = (id) => {
      // Send a DELETE request to the backend to delete the row by ID
      fetch(`http://localhost:8080/rezervacie/delete/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // If the deletion is successful, call the onDelete callback
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    useEffect(() => {
      fetchData();
    }, []);
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/rezervacie');
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.log('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return (
      <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Datum</th>
          <th>Cas</th>
          <th>Pouzivatel ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rezervacia) => (
          <tr key={rezervacia.id}>
            <td>{rezervacia.id}</td>
            <td>{rezervacia.datum}</td>
            <td>{rezervacia.cas}</td>
            <td>{rezervacia.pouzivatel_id}</td>
            <td>
              <button onClick={() => handleDelete(rezervacia.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  }
  
  export default DeleteRezervacia;