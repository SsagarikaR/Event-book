export interface forEvents{
    EventID:number
    EventName:string
    date:string
    location:string
}

export interface forBooking{
    BookingID: number;
    EventName: number;
    BookedBy: number;
}

export interface forBookingContext{
    bookings: forBooking[];
    updateBooking: () => void;
}