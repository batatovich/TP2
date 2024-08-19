'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_OTHERS_EVENTS } from '@/lib/graphql/queries';
import ApplyToEventButton from '@/components/applyToEventButton';
import CancelApplicationButton from '@/components/cancelApplicationButton';

export default function DiscoverPage() {
  const { loading, error, data, refetch } = useQuery(GET_OTHERS_EVENTS);

  if (loading) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-lg font-medium text-blue-600 animate-pulse">
        Loading...
      </p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-lg font-medium text-red-600">
        Error fetching events: {error.message}
      </p>
    </div>
  );

  const events = data?.othersEvents || [];

  const renderApplicationStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return (
          <p className="bg-yellow-200 text-yellow-800 font-bold px-4 py-2 rounded">
            Pending
          </p>
        );
      case 'ACCEPTED':
        return (
          <p className="bg-green-200 text-green-800 font-bold px-4 py-2 rounded">
            Accepted
          </p>
        );
      case 'REJECTED':
        return (
          <p className="bg-red-200 text-red-800 font-bold px-4 py-2 rounded">
            Rejected
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Discover Events. Explore and join events hosted by others.</h1>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => {
            const application = event.applications?.[0];

            return (
              <div
                key={event.id}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="flex justify-between items-center mb-2">
                  {!application && (
                    <p className="text-slate-600 font-bold">
                      Don't miss out, apply now!
                    </p>
                  )}
                  {application && renderApplicationStatus(application.status)}
                  <div className="ml-auto">
                    {!application || application.status === 'REJECTED' ? (
                      <ApplyToEventButton eventId={event.id} refetch={refetch} />
                    ) : (
                      application.status !== 'REJECTED' && (
                        <CancelApplicationButton
                          applicationId={application.id}
                          refetch={refetch}
                        />
                      )
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-purple-700">{event.name}</h2>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p>{event.location}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date:</p>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Applications:</p>
                    <p>{event.acceptedApplicationCount}/{event.capacity}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Fee:</p>
                    <p>{event.fee === 0 ? 'Free' : `$${event.fee}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No events found. Check back later or create your own event!</p>
      )}
    </div>
  );
}
