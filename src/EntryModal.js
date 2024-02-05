// EntryModal.js

import React, { useState } from 'react';

const EntryModal = ({ isOpen, onClose, onSave, date }) => {
  const [questionName, setQuestionName] = useState('');
  const [platform, setPlatform] = useState('');
  const [link, setLink] = useState('');

  const handleSave = () => {
    onSave(date, questionName, platform, link);
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Add Entry for {date.toLocaleDateString('en-GB')}</h2>
          <label htmlFor="questionName">Question Name:</label>
          <input type="text" id="questionName" value={questionName} onChange={(e) => setQuestionName(e.target.value)} />
          <label htmlFor="platform">Platform:</label>
          <input type="text" id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
          <label htmlFor="link">Link:</label>
          <input type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)} />
          <button onClick={handleSave}>Save Entry</button>
        </div>
      </div>
    )
  );
};

export default EntryModal;
