import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';


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
            console.error('Error deleting lapangan:', error);
          }
        }
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
                    <td>
                        <Link to={`/dashboard/edit-booking/${bookingItem.id_booking}`}>
                        <Button variant="primary">Edit</Button>
                        </Link>
                        {' '}
                        <Button variant="danger" onClick={() => deleteBooking(bookingItem.id_booking)}>Delete</Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>

        );



};

export default BookingList