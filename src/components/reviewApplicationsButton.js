import React, { useState } from 'react';
import ReviewApplicationsModal from './reviewApplicationsModal';

export default function ReviewApplicationsButton({ eventId }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Review Applications
      </button>
      {isOpen && (
        <ReviewApplicationsModal eventId={eventId} onClose={handleClose} />
      )}
    </>
  );
}
