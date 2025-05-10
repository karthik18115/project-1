import React, { useState, useRef } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PaperAirplaneIcon } from '../../components/icons';

function PatientMessagesPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'John Doe', content: 'Hi Doctor, I have a question about my medication.', time: '10:30 AM' },
      { id: 2, sender: 'Dr. Smith', content: 'Hello John, what is your question?', time: '10:35 AM' },
      { id: 3, sender: 'John Doe', content: 'Is it okay to take Aspirin with food?', time: '10:40 AM' },
      { id: 4, sender: 'Dr. Smith', content: 'Yes, it\'s fine to take Aspirin with food. In fact, it\'s recommended to avoid stomach irritation.', time: '10:45 AM' }
    ],
    2: [
      { id: 1, sender: 'John Doe', content: 'I\'ve been experiencing some side effects. Can we discuss?', time: 'Yesterday, 3:00 PM' },
      { id: 2, sender: 'Dr. Adams', content: 'Of course, let\'s schedule a time to talk. How about tomorrow morning?', time: 'Yesterday, 3:15 PM' }
    ]
  });
  const contacts = [
    { id: 1, name: 'Dr. Smith', lastMessage: 'Yes, it\'s fine to take Aspirin with food...', time: '10:45 AM', unread: false },
    { id: 2, name: 'Dr. Adams', lastMessage: 'Of course, let\'s schedule a time to talk...', time: 'Yesterday', unread: true },
    { id: 3, name: 'Dr. Brown', lastMessage: 'Your lab results are ready for review.', time: 'Monday', unread: true }
  ];
  const messageInputRef = useRef(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    const updatedContacts = contacts.map(c =>
      c.id === contact.id ? { ...c, unread: false } : c
    );
    console.log("Updated Contacts (mock):", updatedContacts);
  };

  const handleSendMessage = (content) => {
    if (!selectedContact || !content?.trim()) return;
    const newMessage = {
      id: messages[selectedContact.id]?.length + 1 || 1,
      sender: 'John Doe',
      content,
      time: 'Just now'
    };
    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage]
    }));
    if (messageInputRef.current) {
      messageInputRef.current.value = '';
    }
  };

  return (
    <div className="flex h-[calc(100vh-theme(space.24))] bg-slate-100">
      <aside className="w-full md:w-1/3 lg:w-1/4 h-full border-r border-slate-200 bg-white flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className={`block w-full p-3 border-b border-slate-100 cursor-pointer transition-colors duration-150 ease-in-out ${selectedContact?.id === contact.id ? 'bg-teal-50 border-l-4 border-teal-500' : 'hover:bg-slate-50'}`}
              onClick={() => handleContactSelect(contact)}
            >
              <div>
                <div className="flex justify-between items-center mb-0.5">
                  <p className={`font-semibold text-sm ${contact.unread ? 'text-teal-700' : 'text-slate-800'}`}>{contact.name}</p>
                  <p className="text-xs text-slate-400 flex-shrink-0 ml-2">{contact.time}</p>
                </div>
                <p className="text-xs text-slate-500 truncate">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <section className="flex-1 flex flex-col h-full bg-white">
        {selectedContact ? (
          <>
            <header className="p-4 border-b border-slate-200 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-semibold text-slate-600">{selectedContact.name.charAt(0)}</div>
              <h3 className="text-lg font-semibold text-slate-800">{selectedContact.name}</h3>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages[selectedContact.id]?.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'John Doe' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl shadow-sm ${msg.sender === 'John Doe' ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-800'}`}>
                    <p className="text-sm leading-snug">{msg.content}</p>
                    <p className="text-xs mt-1 ${msg.sender === 'John Doe' ? 'text-teal-100' : 'text-slate-500'} text-right">{msg.time}</p>
                  </div>
                </div>
              )) ?? (
                <p className="text-center text-slate-500 text-sm">No messages yet.</p>
              )}
            </div>
            <div className="p-4 border-t border-slate-200 bg-white flex items-center space-x-3">
              <textarea
                ref={messageInputRef}
                rows={1}
                placeholder="Type your message..."
                className="flex-1 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500 resize-none"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e.currentTarget.value);
                  }
                }}
              />
              <Button
                variant="primary"
                className="flex-shrink-0 !p-2.5"
                onClick={() => handleSendMessage(messageInputRef.current?.value)}
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="w-5 h-5"/>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 p-4">
            <p className="text-center"><span className="text-2xl block mb-2">←</span> Select a conversation to start messaging.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default PatientMessagesPage; 