import { useEffect, useState } from "react";
import { makeDeleteRequest, makeGetRequest, makePatchRequest, makePostRequest } from "../helpers/fetchData";
import { forEvents } from "../Interface/interface";
import Delete from "../assets/delete.png"
import booking from "../assets/booking.png"
import edit from "../assets/edit.png"
import { useBookingContext } from "../context/bookedEventContex";
import ConfirmationModal from './ConfirmationModal';  
import "../styles/events.css";

function Events() {
  const { updateBooking } = useBookingContext() ?? {};

  const users = [
    {
      userID: 1,
      userName: "John"
    },
    {
      userID: 2,
      userName: "Jessy"
    },
    {
      userID: 3,
      userName: "Tom"
    },
    {
      userID: 4,
      userName: "Tony"
    },
  ];

  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState<number | undefined>();
  const [EventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState();
  const [events, setEvents] = useState<forEvents[] | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);  
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);  

  const createEvent = async () => {
    const data = await makePostRequest("events", { EventName: EventName, location: location, date: date });
    setResponse(data);
    setEventName("");
    setLocation("");
    setDate("");
  };

  const bookEvent = async (EventId: number) => {
    const userIndex = Math.floor(Math.random() * users.length);
    const userId = users[userIndex].userID;
    const response = await makePostRequest("bookings", { userId: userId, EventId: EventId });
    if (response.message) {
      updateBooking();
      setShowModal(false);  
    }
  };

  const getData = async (route: string) => {
    const response = await makeGetRequest(route);
    setEvents(response);
  };

  const setEdit = async (EventID: number, EventName: string, location: string, date: string) => {
    setEditID(EventID);
    setEventName(EventName);
    setLocation(location);
    setDate(date);
    setIsEdit(!isEdit);
  };

  const updateEvent = async () => {
    const response = await makePatchRequest("events", { eventID: editID, EventName: EventName, location: location, date: date });
    setResponse(response);
    setIsEdit(!isEdit);
  };

  const deleteEvent = async (eventID: number) => {
    const response = await makeDeleteRequest("events", { eventID: eventID });
    setResponse(response);
  };

  const openBookingModal = (EventId: number) => {
    setSelectedEventId(EventId); 
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
    setSelectedEventId(null); 
  };

  useEffect(() => {
    getData("events");
  }, [response]);

  return (
    <div className="event">
      <h2>Events</h2>
      <div className="search-event">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
          placeholder="Search events by name"
        />
        <button className="btn" onClick={(e) => { e.preventDefault(); getData(`events/${search}`); }}>Search</button>
      </div>
      <div className="create-event">
        <h2>Create an Event:</h2>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={EventName}
          onChange={(e) => { setEventName(e.target.value); }}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={(e) => { setLocation(e.target.value); }}
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); }}
        />
        {isEdit ?
          <button className="add-event btn" onClick={async (e) => { e.preventDefault(); updateEvent(); }}>Update Event</button> :
          <button className="add-event btn" onClick={async (e) => { e.preventDefault(); createEvent(); }}>Add Event</button>
        }
      </div>

      <table>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        {events && events.length > 0 ? events.map((event) => (
          <tr key={event.EventID}>
            <td>{event.EventName}</td>
            <td>{event.location}</td>
            <td>{event.date}</td>
            <td>
              <img src={edit} className="action-icon" onClick={() => { setEdit(event.EventID, event.EventName, event.location, event.date); }} />
              <img className="action-icon" src={Delete} onClick={() => { deleteEvent(event.EventID); }} />
              <img src={booking} className="action-icon" onClick={() => { openBookingModal(event.EventID); }} />
            </td>
          </tr>
        )) :
          <tr><h2 className="no-data">No event found</h2></tr>
        }
      </table>

      <ConfirmationModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={() => { bookEvent(selectedEventId!); }}
        eventName={events?.find(event => event.EventID === selectedEventId)?.EventName || ''}
      />
    </div>
  );
}

export default Events;
