import { fetchMyEvents } from '@/lib/events';
import { decrypt } from '@/lib/sessions';
import { cookies } from 'next/headers';
import CreateEventButton from '@/components/createEventButton';

export default async function MyEventsPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  let userId = null;

  if (sessionCookie) {
    const session = await decrypt(sessionCookie);
    userId = session?.userId;
  }

  if (!userId) {
    // Handle the case where the user is not authenticated
    // e.g., redirect to login page
    return (
      <div>
        <p>Please log in to view your events.</p>
      </div>
    );
  }

  const events = await fetchMyEvents(userId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <CreateEventButton />
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.location}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>Capacity: {event.capacity}</p>
              <p>Fee: {event.fee === 0 ? 'Free' : `$${event.fee}`}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found. Create your first event!</p>
      )}
    </div>
  );
}
