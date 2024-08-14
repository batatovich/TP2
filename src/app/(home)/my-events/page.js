'use client';

import React, { useState, useEffect } from 'react';
import CreateEventModal from '@/components/createEventModal';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch events data
    async function fetchEvents() {
      const response = await fetch('/api/events/my-events');
      const data = await response.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create Event
      </button>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>Capacity: {event.capacity}</p>
              <p>Fee: {event.fee === 0 ? 'Free' : `$${event.fee}`}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found. Create your first event!</p>
      )}
      {isModalOpen && (
        <CreateEventModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default MyEventsPage;