import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';

const BookingList = () => {

    const [booking, setBooking] = useState([]);

    useEffect(() => {
        fetchBooking();
      }, []);

    const fetchBooking = async () => {
        try {
            const response = await axios.get('http://localhost:3000/booking/');
            setBooking(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteBooking = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:3000/booking/${id}`);
                fetchBooking(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'd-MMMM-yyyy');
    };

    return (
        <div>
            <h1>Booking List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama User</th>
                        <th>Email User</th>
                        <th>Nama Lapangan</th>
                        <th>Tipe Lapangan</th>
                        <th>Foto Lapangan</th>
                        <th>Tanggal Book</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {booking.map((bookingItem) => (
                        <tr key={bookingItem.id_booking}>
                            <td>{bookingItem.id_booking}</td>
                            <td>{bookingItem.username}</td>
                            <td>{bookingItem.email}</td>
                            <td>{bookingItem.nama_lapangan}</td>
                            <td>{bookingItem.tipe_lapangan}</td>
                            <td>
                                <img
                                    src={`http://localhost:3000/images/${bookingItem.foto_lapangan}`}
                                    alt={bookingItem.foto_lapangan}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            </td>
                            <td>{formatDate(bookingItem.booking_date)}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteBooking(bookingItem.id_booking)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BookingList;
