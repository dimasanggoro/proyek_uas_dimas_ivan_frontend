import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';

const AddBooking = () => {
    const [userData, setUserData] = useState([]);
    const [lapangan, setLapangan] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
    const [selectedLapangan, setSelectedLapangan] = useState(null); // State to store the selected lapangan
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUserData = async () => {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
              setUserData(JSON.parse(storedUserData));
            } else {
              // If no user data found, navigate to login page
              navigate('/');
            }
          };
        fetchUserData();
        fetchLapangan();
    }, []);

    const fetchLapangan = async () => {
        try {
            const response = await axios.get('http://localhost:3000/lapangan/');
            setLapangan(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = (lapanganItem) => {
        setSelectedLapangan(lapanganItem); // Set the selected lapangan
        setShowModal(true); // Show the modal
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal
    };

    const handleBookingSubmit = async (e) => {
        // Implement booking submission logic here
        console.log('Submitting booking for:', selectedLapangan);
        console.log('Submitting booking for:', userData.username);
        // You can perform your booking submission logic here
        // Make sure to handle the form submission according to your requirements

        
    };

    return (
        <div>
            <h1>Add Booking</h1>
            <Row>
                {lapangan.map((lapanganItem) => (
                    <Col key={lapanganItem.id_lapangan} md={4}>
                        <Card>
                            <Card.Img variant="top" src={`http://localhost:3000/images/${lapanganItem.foto_lapangan}`} />
                            <Card.Body>
                                <Card.Title>{lapanganItem.nama_lapangan}</Card.Title>
                                <Card.Text>
                                    Tipe Lapangan: {lapanganItem.tipe_lapangan}
                                </Card.Text>
                                <Button variant="primary" onClick={() => openModal(lapanganItem)}>Booking Lapangan</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal for booking */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Lapangan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Anda Yakin Booking?</Form.Label>
                            <Form.Control type="hidden" placeholder="Masukkan nama lapangan" value={selectedLapangan ? selectedLapangan.id_lapangan : ''} readOnly />
                        </Form.Group>
                        {/* Add other form fields as needed */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleBookingSubmit}>Submit Booking</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddBooking;
