import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Import Quill styles
import Button from '../ui/Button';
import { toast } from 'react-toastify'; // Import toast

const AddNoteForm = ({ patientId, onSave, onCancel }) => {
  const [noteContent, setNoteContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!noteContent.trim() || noteContent.replace(/<(.|\n)*?>/g, '').trim() === '') { // Also check for empty HTML
      toast.warn("Note content cannot be empty."); // Use toast.warn
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving note for patient:", patientId, "Content:", noteContent);
    onSave(noteContent); // Pass content back to parent
    setIsLoading(false);
    setNoteContent(''); // Reset editor
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">Add New Clinical Note</h3>
      <div className="mb-4">
        <label htmlFor="noteContent" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Note Details
        </label>
        <div className="bg-white dark:bg-slate-700 rounded-md overflow-hidden quill-dark-theme-container">
          <ReactQuill 
            theme="snow" 
            value={noteContent} 
            onChange={setNoteContent}
            placeholder="Start typing your clinical note..."
            className="h-48 mb-20 md:h-64"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-12">
        <Button 
          variant="outline"
          onClick={onCancel} 
          disabled={isLoading}
          className="dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          isLoading={isLoading} 
          disabled={isLoading || !noteContent.trim()}
          className="dark:bg-primary-dark dark:hover:bg-primary-darker"
        >
          {isLoading ? 'Saving...' : 'Save Note'}
        </Button>
      </div>
    </div>
  );
};

export default AddNoteForm; 