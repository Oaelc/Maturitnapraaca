import React, { ChangeEvent, FormEvent, useState } from 'react';

interface FormData {
  id: string;
  datum: string;
  cas: string;
  pouzivatel_id: string;
  admin_id: string;
}

function UpdateRezervaciaForm() {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    datum: '',
    cas: '',
    pouzivatel_id: '',
    admin_id: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/rezervacie/create", {
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success or error response from the server
      const result = await response.json();
      console.log(result); // Log the server's response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="datum">Datum:</label>
        <input
          type="text"
          id="datum"
          name="datum"
          value={formData.datum}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cas">Cas:</label>
        <input
          type="text"
          id="cas"
          name="cas"
          value={formData.cas}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pouzivatel_id">Pouzivatel ID:</label>
        <input
          type="text"
          id="pouzivatel_id"
          name="pouzivatel_id"
          value={formData.pouzivatel_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="admin_id">Admin ID:</label>
        <input
          type="text"
          id="admin_id"
          name="admin_id"
          value={formData.admin_id}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateRezervaciaForm;
