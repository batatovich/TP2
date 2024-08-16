'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '@/lib/graphql/mutations';
import { CreateEventSchema } from '@/lib/definitions';

const CreateEventModal = ({ onClose, refetch }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    capacity: '',
    fee: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      setIsSubmitting(false);
      onClose();
      refetch();
    },
    onError: (err) => {
      setIsSubmitting(false);
      console.error('Error creating event:', err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, location, date, capacity, fee } = formData;

    try {
      await CreateEventSchema.validate(formData, { abortEarly: false });

      setIsSubmitting(true);
      await createEvent({
        variables: {
          name,
          description,
          location,
          date,
          capacity: parseInt(capacity, 10),
          fee: parseFloat(fee),
        },
      });
    } catch (validationError) {
      setIsSubmitting(false);
      if (validationError.name === 'ValidationError') {
        const formattedErrors = validationError.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setValidationErrors(formattedErrors);
        console.log('Validation errors:', formattedErrors);
      } else {
        console.error('Unexpected error during validation:', validationError);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            {validationErrors.name && <p className="text-red-500 text-sm">{validationErrors.name}</p>}
          </div>

          <div className="mb-4">
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            {validationErrors.description && <p className="text-red-500 text-sm">{validationErrors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              {validationErrors.location && <p className="text-red-500 text-sm">{validationErrors.location}</p>}
            </div>
            <div>
              <label>Date</label>
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              {validationErrors.date && <p className="text-red-500 text-sm">{validationErrors.date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              {validationErrors.capacity && <p className="text-red-500 text-sm">{validationErrors.capacity}</p>}
            </div>
            <div>
              <label>Fee</label>
              <input
                type="number"
                step="0.01"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              {validationErrors.fee && <p className="text-red-500 text-sm">{validationErrors.fee}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-slate-100 hover:bg-slate-200 mr-2 px-4 py-2 rounded border">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-slate-600"
              disabled={loading || isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">Error creating event: {error.message}</p>}
      </div>
    </div>
  );
};

export default CreateEventModal;