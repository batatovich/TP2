'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DELETE_EVENT } from '@/lib/graphql/mutations';

const DeleteEventButton = ({ eventId, refetch }) => {

  const [deleteEvent, { loading, error }] = useMutation(DELETE_EVENT, {
    onCompleted: () => {
      refetch();
    },
    onError: (err) => {
      console.error('Error deleting event:', err);
    },
  });

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent({
          variables: { id: eventId }, 
        });
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
      disabled={loading}
    >
      <FontAwesomeIcon icon={faTrash} />
      {error && <p className="text-red-500">Failed to delete event</p>}
    </button>
  );
};

export default DeleteEventButton;
