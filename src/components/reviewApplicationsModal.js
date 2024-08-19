import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT_APPLICATIONS } from '@/lib/graphql/queries';
import { UPDATE_APPLICATION_STATUS } from '@/lib/graphql/mutations';

export default function ReviewApplicationsModal({ eventId, onClose }) {
  const { loading, error, data, refetch } = useQuery(GET_EVENT_APPLICATIONS, {
    variables: { eventId },
  });

  const [updateStatus] = useMutation(UPDATE_APPLICATION_STATUS, {
    onCompleted: () => refetch(),
  });

  const handleStatusChange = (applicationId, status) => {
    updateStatus({ variables: { id: applicationId, status } });
  };

  const applications = data?.eventApplications || [];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Review Applications</h2>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-lg font-medium text-blue-600 animate-pulse">
              Loading...
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-lg font-medium text-red-600">
              Error fetching applications: {error.message}
            </p>
          </div>
        ) : (
          <ul>
            {applications.map(app => (
              <li key={app.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg">{app.user.email}</p>
                  <div className="space-x-2">
                    {app.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(app.id, 'ACCEPTED')}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, 'REJECTED')}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {app.status !== 'PENDING' && (
                      <span
                        className={`px-4 py-2 rounded ${
                          app.status === 'ACCEPTED' ? 'bg-green-200' : 'bg-red-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
