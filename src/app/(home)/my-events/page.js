import { fetchMyEvents } from '@/lib/event-actions';
import CreateEventButton from '@/components/createEventButton';
import DeleteEventButton from '@/components/deleteEventButton';

export const dynamic = "force-dynamic";

export default async function MyEventsPage() {

  const events = await fetchMyEvents();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Your Events. Create events and review applications.</h1>
        <CreateEventButton />
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold mb-2 text-purple-700">{event.name}</h2>
                <DeleteEventButton eventId={event.id} />
              </div>
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
                  <p className="font-semibold">Capacity:</p>
                  <p>{event.capacity}</p>
                </div>
                <div>
                  <p className="font-semibold">Fee:</p>
                  <p>{event.fee === 0 ? 'Free' : `$${event.fee}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found. Create your first event!</p>
      )}
    </div>
  );
}
