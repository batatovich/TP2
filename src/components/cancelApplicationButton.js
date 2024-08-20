import React from 'react';
import { useMutation } from '@apollo/client';
import { CANCEL_APPLICATION } from '@/lib/graphql/mutations';

export default function CancelApplicationButton({ applicationId, refetch }) {
  const [cancelApplication, { loading }] = useMutation(CANCEL_APPLICATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (err) => {
      console.error('Error canceling application:', err.message);
    },
  });

  const handleCancel = async () => {
    try {
      await cancelApplication({ variables: { id: applicationId } });
    } catch (err) {
      console.error('Error canceling application:', err);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {loading ? 'Canceling...' : 'Cancel Application'}
    </button>
  );
}
