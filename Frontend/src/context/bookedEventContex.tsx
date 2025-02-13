import { createContext, ReactNode, useContext, useState } from 'react';
import { forBooking, forBookingContext } from '../Interface/interface';
import { makeGetRequest } from '../helpers/fetchData';

const bookingContext = createContext<forBookingContext | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<forBooking[]>([]);

  const updateBooking =async () => {
    const events=await  makeGetRequest("bookings");
    console.log(events,"booking");
    setBookings(events);
  };

  return (
    <bookingContext.Provider value={{ bookings, updateBooking }}>
      {children}
    </bookingContext.Provider>
  );
};

export const useBookingContext = () => {
    const context = useContext(bookingContext);
    if (!context) {
        throw new Error('useBookingContext must be used within a BookingContext');
    }
    return context;
};
