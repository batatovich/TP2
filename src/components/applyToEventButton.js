import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { APPLY_TO_EVENT } from '@/lib/graphql/mutations';

export default function ApplyToEventButton({ eventId, refetch }) {
  const [applyToEvent, { loading }] = useMutation(APPLY_TO_EVENT, {
    onCompleted: () => {
      refetch();  // Refetch events after successful application
    },
    onError: () => {
      setButtonDisabled(false);  // Re-enable the button if the request fails
    },
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleApply = async () => {
    setButtonDisabled(true);  // Disable the button immediately on click
    try {
      await applyToEvent({ variables: { id: eventId } });
    } catch (err) {
      console.error('Error applying to event:', err);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={loading || buttonDisabled}  // Disable if loading or already clicked
      className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {loading ? 'Applying...' : 'Apply'}
    </button>
  );
}
