import { Amplify } from './amplify-config.js';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

document.addEventListener('DOMContentLoaded', () => {
    fetchBookings();
});

async function fetchBookings() {
    const tableBody = document.getElementById('bookings-table-body');
    tableBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';

    try {
        const { data: bookings, errors } = await client.models.TicketBooking.list();
        if (errors) {
            console.error('Error fetching bookings:', errors);
            tableBody.innerHTML = '<tr><td colspan="6">Error fetching data.</td></tr>';
            return;
        }

        if (bookings.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">No bookings found.</td></tr>';
            return;
        }

        let tableContent = '';
        bookings.forEach(booking => {
            tableContent += `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.movie}</td>
                    <td>${booking.userEmail}</td>
                    <td>${booking.seats}</td>
                    <td>${booking.price}</td>
                    <td>${new Date(booking.bookingTime).toLocaleString()}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = tableContent;
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        tableBody.innerHTML = '<tr><td colspan="6">An unexpected error occurred.</td></tr>';
    }
}
