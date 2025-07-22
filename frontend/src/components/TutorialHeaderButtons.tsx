import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { useTutorial } from '../contexts/TutorialContext';

const TutorialHeaderButtons: React.FC = () => {
  const { handleTutorialButton } = useTutorial();

  return (
    <>
      <button
        className="ml-2 p-2 rounded-full hover:bg-gray-800 transition-colors"
        onClick={handleTutorialButton}
        aria-label="Tutorial"
      >
        <FaQuestionCircle size={22} />
      </button>
    </>
  );
};

export default TutorialHeaderButtons; 