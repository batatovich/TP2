'use client';

import React, { useState } from 'react';
import CreateEventModal from '@/components/createEventModal';

const CreateEventButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Create Event
      </button>
      {isModalOpen && <CreateEventModal onClose={closeModal} />}
    </>
  );
};

export default CreateEventButton;
