import { cookies } from 'next/headers';
import { decrypt } from '@/lib/sessions';
import { fetchMyEvents } from '@/lib/events';
import CreateEventButton from '@/components/createEventButton';

export default async function MyEventsPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  let userId = null;

  if (sessionCookie) {
    const sessionData = await decrypt(sessionCookie);
    userId = sessionData?.userId;
  }

  if (!userId) {
    return (
      <div>
        <p>Please log in to view your events.</p>
      </div>
    );
  }

  const events = await fetchMyEvents(userId);

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
              <h2 className="text-2xl font-bold mb-2 text-purple-700">{event.name}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-800"><strong>Location:</strong> {event.location}</p>
              <p className="text-gray-800"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-800"><strong>Capacity:</strong> {event.capacity}</p>
              <p className="text-gray-800">
                <strong>Fee:</strong> {event.fee === 0 ? 'Free' : `$${event.fee}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found. Create your first event!</p>
      )}
    </div>
  );
}
