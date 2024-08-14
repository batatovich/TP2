'use client';

import React, { useState } from 'react';
import CreateEventModal from './createEventModal';

export default function CreateEventButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create Event
      </button>
      {isModalOpen && <CreateEventModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
