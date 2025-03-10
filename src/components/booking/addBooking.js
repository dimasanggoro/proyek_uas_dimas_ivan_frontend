import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import api from '../../api'; // Import the api instance

const AddBooking = () => {
    const [userId, setUserId] = useState({});
    const [userData, setUserData] = useState({});
    const [lapangan, setLapangan] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLapangan, setSelectedLapangan] = useState(null);
    const [bookingDate, setBookingDate] = useState(''); // State for booking date
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                setUserData(parsedUserData);
                fetchUserId(parsedUserData.username);
            } else {
                navigate('/');
            }
        };

        fetchUserData();
        fetchLapangan();
    }, []);

    const fetchLapangan = async () => {
        try {
            const response = await api.get('http://localhost:3000/lapangan/');
            setLapangan(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUserId = async (username) => {
        try {
            const response = await api.post('http://localhost:3000/userid', { username });
            setUserId(response.data);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const openModal = (lapanganItem) => {
        setSelectedLapangan(lapanganItem);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            id_login: userId.id_login, // Assuming the user data contains an ID field
            id_lapangan: selectedLapangan.id_lapangan,
            booking_date: bookingDate,
        };

        try {
            const response = await api.post('http://localhost:3000/booking', bookingData);
            console.log('Booking successful:', response.data);
            closeModal();
            navigate('/dashboard/list-booking'); // Redirect to dashboard or another page after successful booking
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
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

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">Booking Lapangan</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleBookingSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Control type="hidden" value={selectedLapangan ? selectedLapangan.id_lapangan : ''} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formBookingDate">
                            <Form.Label className="d-flex justify-content-center">Masukan Booking Date</Form.Label>
                            <Form.Control
                                className="w-50 mx-auto p-3 text-center"
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">Submit Booking</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );
};

export default AddBooking;
