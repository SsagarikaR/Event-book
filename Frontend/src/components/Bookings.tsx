import{ useEffect } from 'react'
import { useBookingContext } from '../context/bookedEventContex'
import { forBooking } from '../Interface/interface';
import "../styles/bookings.css"

function Bookings() {
  const {updateBooking,bookings}=useBookingContext();

  useEffect(()=>{
    updateBooking();
  },[]);

  return (
    <div className='bookings'>
      <h1>Bookings</h1>
      <table>
        <thead>
          <th>Booking ID</th>
          <th>Booked by(User ID)</th>
          <th>Event Name</th>
        </thead>
        <tbody>
        {bookings && bookings.length>0 ? bookings.map((booking:forBooking) => ( 
          <tr key={booking.BookingID}>
            <td>{booking.BookingID}</td>
            <td>{booking.BookedBy}</td>
            <td>{booking.EventName}</td>
           </tr> 
        )):<tr><h2 className="no-data">No Bookings bound</h2></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default Bookings
