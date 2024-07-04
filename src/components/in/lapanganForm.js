import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LapanganForm = () => {
  const [id_tipe_lapangan, setid_tipe_lapangan] = useState([]);
  const [nama_lapangan, setnama_lapangan] = useState('');
  const [foto_lapangan, setfoto_lapangan] = useState(null);
  const [tipeLapanganOptions, setTipeLapanganOptions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchLapanganById = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/lapangan/${id}`);
    const { id_tipe_lapangan, nama_lapangan } = response.data;
    setid_tipe_lapangan(id_tipe_lapangan);
    setnama_lapangan(nama_lapangan);
    setfoto_lapangan(null);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchLapanganById();
    }
  }, [id, fetchLapanganById]);

  useEffect(() => {
    const fetchTipeLapanganOptions = async () => {
      const response = await axios.get('http://localhost:3000/tipe-lapangan');
      setTipeLapanganOptions(response.data);
    };
    fetchTipeLapanganOptions();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id_tipe_lapangan', id_tipe_lapangan);
    formData.append('nama_lapangan', nama_lapangan);
    if (foto_lapangan) {
      formData.append('foto_lapangan', foto_lapangan);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:3000/lapangan/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:3000/lapangan', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      navigate('/dashboard/list-lapangan');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2 className="my-3">{id ? 'Edit Lapangan' : 'Tambah Lapangan'}</h2>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="formTipeLapangan" className="mb-3">
          <Form.Label>Tipe Lapangan</Form.Label>
          <Form.Select
              value={id_tipe_lapangan}
              onChange={(e) => setid_tipe_lapangan(e.target.value)}
            >
              <option value="">Pilih tipe lapangan</option>
              {tipeLapanganOptions.map((option) => (
                <option key={option.id_tipe_lapangan} value={option.id_tipe_lapangan}>
                  {option.tipe_lapangan}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formNama" className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama lapangan"
            value={nama_lapangan}
            onChange={(e) => setnama_lapangan(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFotoLapangan" className="mb-3">
          <Form.Label>Foto Lapangan</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setfoto_lapangan(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LapanganForm;
