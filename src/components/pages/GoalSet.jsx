import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function GoalSetPage() {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState({
    '2025-04-21': [{ title: 'Math Assignment', type: 'assignment' }],
    '2025-04-23': [{ title: 'Physics Quiz', type: 'quiz' }],
    '2025-04-25': [{ title: 'Literature Essay', type: 'assignment' }],
    '2025-04-28': [{ title: 'Chemistry Lab', type: 'lab' }],
  });
  
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'assignment',
    time: ''
  });

  useEffect(() => {
    const dateStr = value.toISOString().split('T')[0];
    setSelectedDayEvents(events[dateStr] || []);
  }, [value, events]);

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const dateStr = date.toISOString().split('T')[0];
    const dateEvents = events[dateStr] || [];
    
    if (dateEvents.length === 0) return null;
    
    return (
      <div className="p-20">
        <div className="flex justify-center mt-1 m-20">
          {dateEvents.map((event, index) => {
            let dotColor = 'bg-blue-500';
            if (event.type === 'quiz') dotColor = 'bg-yellow-500';
            if (event.type === 'lab') dotColor = 'bg-green-500';
        
            return (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${dotColor} mx-0.5`}
                title={event.title}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'quiz': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'lab': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-blue-100 border-blue-300 text-blue-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      return;
    }

    const dateStr = value.toISOString().split('T')[0];
    
    setEvents(prevEvents => {
      const updatedEvents = {
        ...prevEvents,
        [dateStr]: [...(prevEvents[dateStr] || []), { ...newEvent }]
      };
      return updatedEvents;
    });


    setNewEvent({
      title: '',
      type: 'assignment',
      time: ''
    });
    setIsModalOpen(false);

    setSelectedDayEvents(prev => [...prev, { ...newEvent }]);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const deleteEvent = (index) => {
    const dateStr = value.toISOString().split('T')[0];
    
    const filteredEvents = selectedDayEvents.filter((_, i) => i !== index);
    
    setEvents(prev => ({
      ...prev,
      [dateStr]: filteredEvents
    }));
    
    setSelectedDayEvents(filteredEvents);
  };

  return (
    <div className="calendar-container m-4">
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Schedule</h2>
        <p className="text-gray-600">Keep track of your upcoming assignments and exams</p>
      </div>
      
      <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          className="custom-calendar"
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
        />
      </div>
      
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">
            {formatDate(value)}
          </h3>
          <button 
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Add Event
          </button>
        </div>
        
        {selectedDayEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">No events scheduled for this day</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {selectedDayEvents.map((event, index) => (
              <li 
                key={index} 
                className={`px-4 py-3 rounded-lg border ${getEventTypeColor(event.type)} flex justify-between items-center`}
              >
                <div>
                  <span className="font-medium">{event.title}</span>
                  {event.time && (
                    <span className="text-xs ml-2">
                      @ {event.time}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs capitalize px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {event.type}
                  </span>
                  <button 
                    onClick={() => deleteEvent(index)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Delete event"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
          <span>Assignment</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
          <span>Quiz</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span>Lab</span>
        </div>
      </div>
      
      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Add Event for {formatDate(value)}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time (Optional)
                </label>
                <input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        
        .react-calendar__tile {
          padding-bottom: 1.5em;
          position: relative;
          height: 80px;
        }
        
        .react-calendar__tile--active {
          background: #3B82F6;
          color: white;
        }
        
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #2563EB;
        }
        
        .react-calendar__navigation button {
          font-size: 1rem;
          font-weight: 500;
        }
        
        .react-calendar__month-view__weekdays {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
        
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #F3F4F6;
        }
      `}</style>
    </div>
  );
}