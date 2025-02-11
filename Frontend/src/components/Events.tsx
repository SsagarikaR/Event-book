import { useState } from "react";
import { makePostRequest } from "../helpers/fetchData";


function Events() {
  const [search,setSearch]=useState("");
  const [EventName,setEventName]=useState("");
  const [location,setLocation]=useState("");
  const [date,setDate]=useState("");

  const [response,setResponse]=useState();
  return (
    <div className="event">
      <h2>Events</h2>
      <div className="search-event"><input
        type="text"
        value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
        placeholder="Search events"
      />
      </div>
      <div className="create-event">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={EventName}
          onChange={((e)=>{setEventName(e.target.value)})}
        />
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e)=>{setLocation(e.target.value)}}
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e)=>{setDate(e.target.value)}}
        />
        <button className="add-event" onClick={async(e)=>{
          e.preventDefault();
          const data=await makePostRequest("events",{EventName:EventName,location:location,date:date});
          setResponse(data)
          console.log(response);
        }}>Add Event</button>
        {/* {response&&<div>
          {response.message? response.message}</div>} */}
      </div>

      <ul>
        {/* {filteredEvents && filteredEvents.map((event) => ( */}
          {/* <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.location}</p>
            <p>{event.date}</p> */}
            <button>Update Event</button>
            <button>Book Event</button>
          {/* </li> */}
        {/* ))} */}
      </ul>
    </div>
  );
}

export default Events;

