'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteEvent } from '@/lib/event-actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteEventButton = ({ eventId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
        router.refresh();
      } catch (error) {
        console.error('Failed to delete event:', error);
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
