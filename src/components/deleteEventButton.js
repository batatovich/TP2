'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteEventButton = ({ eventId, refetch }) => {

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch('/api/events/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete event');
        }
        refetch();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="top-2 right-2 p-2 rounded hover:text-slate-500"
      aria-label="Delete Event"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteEventButton;
