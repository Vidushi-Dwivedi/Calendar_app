// Simplified pseudocode for a React-based web app

import React, { useState, useEffect, useCallback } from 'react';
import Calendar from './Calendar';
import EntryModal from './EntryModal';
import "./App.css";


const CalendarApp = () => {
  const [entries, setEntries] = useState([]); // Array to store daily entries
  const [targetDate, setTargetDate] = useState(new Date('2024-12-31')); // Set your target date here
  const [startDate, setStartDate] = useState(new Date()); // Default to current date
  const [newStartDate, setNewStartDate] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

// Memoized fetchEntriesFromMongoDB function
const fetchEntriesFromMongoDB = useCallback(async () => {
  try {
    const response = await fetch('/get-entries');
    const data = await response.json();
    setEntries(data.entries);
  } catch (error) {
    console.error('Error fetching entries from MongoDB', error);
  }
}, []); // Empty dependency array since no external dependencies

// Fetch entries from MongoDB when component mounts
useEffect(() => {
  fetchEntriesFromMongoDB();
}, [fetchEntriesFromMongoDB, selectedDate]);


    // Function to add a new entry to MongoDB
    const addEntryToMongoDB = async (date, questionName, platform, link) => {
      try {
        const response = await fetch('http://localhost:3000/save-entry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date, questionName, platform, link }),
        });

        if (response.ok) {
          console.log('Entry saved successfully');
          fetchEntriesFromMongoDB(); // Refresh entries after saving
        } else {
          console.error('Error saving entry to MongoDB');
        }
      } catch (error) {
        console.error('Error saving entry to MongoDB', error);
      }
    };

  // Function to calculate the countdown
  const calculateCountdown = () => {
    const today = new Date();
    const daysLeft = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const handleStartDateChange = (event) => {
   setNewStartDate(event.target.value);
 };

  const handleTargetDateChange = (event) => {
    setNewTargetDate(event.target.value);
  };

  const setNewDates = () => {
     const newStartDateObj = new Date(newStartDate);
     const newTargetDateObj = new Date(newTargetDate);

     setStartDate(newStartDateObj);
     setTargetDate(newTargetDateObj);
   };

   const handleDayClick = (clickedDate) => {
   setSelectedDate(clickedDate);
   openModal();
 };

 const openModal = () => {
   setIsModalOpen(true);
 };

 const closeModal = () => {
   setIsModalOpen(false);
 };

  return (
    <div className = "Main">
      <h1>Calendar App</h1>
      <p>Days left to target: {calculateCountdown()}</p>
      <p>Target Date: {targetDate.toLocaleDateString('en-GB')}</p>
      <p>Start Date: {startDate.toLocaleDateString('en-GB')}</p>

      {/* Set Start Date */}
     <div>
       <label htmlFor="startDate">Set Start Date: </label>
       <input
         type="date"
         id="startDate"
         value={newStartDate}
         onChange={handleStartDateChange}
       />
     </div>

      {/* Set Target Date */}
      <div>
        <label htmlFor="targetDate">Set Target Date: </label>
        <input
          type="date"
          id="targetDate"
          value={newTargetDate}
          onChange={handleTargetDateChange}
        />
        <button onClick={setNewDates}>Set</button>
      </div>

      {/* Calendar View */}
      <Calendar
        entries={entries}
        startDate={startDate}
        targetDate={targetDate}
        onDayClick={handleDayClick}
      />

      {/* Display Entries for Selected Date */}
      {selectedDate && (
        <div>
          <h2>Entries for {selectedDate.toLocaleDateString('en-GB')}:</h2>
          {entries.length > 0 ? (
            <ul>
              {entries.map((entry, index) => (
                <li key={index}>{entry.questionName} on {entry.platform}</li>
              ))}
            </ul>
          ) : (
            <p>No data</p>
          )}
        </div>
      )}

      {/* Daily Log Form */}
      <EntryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={addEntryToMongoDB}
        date={selectedDate}
      />

    </div>
  );
};

export default CalendarApp;
