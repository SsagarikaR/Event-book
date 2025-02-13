import Events from "./components/Events";
import Bookings from "./components/Bookings";
import { BookingProvider } from "./context/bookedEventContex";
import "./App.css"

function App() {

  return (
  <BookingProvider>
  <div className="container">
    <Events/>
    <Bookings/>
  </div> 
   </BookingProvider>
  )
}

export default App
