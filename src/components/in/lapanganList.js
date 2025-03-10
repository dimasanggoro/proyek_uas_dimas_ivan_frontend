import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import api from '../../api'; // Import the api instance

const LapanganList = () => {
  const [lapangan, setLapangan] = useState([]);

  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    try {
      const response = await api.get('/lapangan/');
      setLapangan(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteLapangan = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/lapangan/${id}`);
        fetchLapangan(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting lapangan:', error);
      }
    }
  };

  return (
    <div>
      <h1>Lapangan List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Lapangan</th>
            <th>Tipe Lapangan</th>
            <th>Foto</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lapangan.map((lapanganItem) => (
            <tr key={lapanganItem.id_lapangan}>
              <td>{lapanganItem.id_lapangan}</td>
              <td>{lapanganItem.nama_lapangan}</td>
              <td>{lapanganItem.tipe_lapangan}</td>
              <td>
                <img
                  src={`http://localhost:3000/images/${lapanganItem.foto_lapangan}`}
                  alt={lapanganItem.nama_lapangan}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>
                <Link to={`/dashboard/edit-lapangan/${lapanganItem.id_lapangan}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
                {' '}
                <Button variant="danger" onClick={() => deleteLapangan(lapanganItem.id_lapangan)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LapanganList;
