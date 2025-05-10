import React, { useState, useRef, useEffect } from 'react';
import CustomButton from '../../components/ui/Button';
import { PaperAirplaneIcon, UserCircleIcon, MagnifyingGlassIcon } from '../../components/icons'; // Using MagnifyingGlassIcon as SearchIcon
import useDoctorMessages from '../../hooks/useDoctorMessages'; // Assuming this hook provides necessary data structure

function DoctorMessagesPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const { messages, contacts, isLoading, error, setMessages } = useDoctorMessages();
  const [searchTerm, setSearchTerm] = useState('');
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    const content = messageInputRef.current.value.trim();
    if (!selectedContact || !content) return;
    const newMessage = {
      id: Date.now(),
      sender: 'Dr. Smith',
      content,
      timestamp: new Date().toISOString()
    };
    // Append locally; real send endpoint can be added later
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));
    messageInputRef.current.value = '';
    messageInputRef.current.focus();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedContact]);

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.timeRaw || 0) - new Date(a.timeRaw || 0));

  if (error) {
    return <div className="p-6 text-red-600 dark:text-red-400">Error loading messages: {error.message || error}</div>;
  }

  const inputBaseClass = 'w-full px-3 py-2 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-400 dark:placeholder-slate-500';

  return (
    <div className="h-[calc(100vh-var(--header-height,100px)-2rem)] flex flex-col p-0 md:p-0 max-h-full bg-slate-100 dark:bg-slate-900">
      <header className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 md:hidden">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Messages</h1>
      </header>
      <div className="flex-grow flex overflow-hidden">
        {/* Contact List Sidebar */}
        <aside className={`w-full md:w-1/3 lg:w-1/4 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col ${selectedContact ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 hidden md:block">Conversations</h2>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input 
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${inputBaseClass} pl-10`}
                />
            </div>
          </div>
          {isLoading && !contacts.length ? (
            <div className="p-4 text-slate-500 dark:text-slate-400">Loading contacts...</div>
          ) : (
            <nav className="flex-grow overflow-y-auto">
              {filteredContacts.length > 0 ? filteredContacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/70 ${selectedContact?.id === contact.id ? 'bg-teal-50 dark:bg-teal-700/50' : ''}`}
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold ${selectedContact?.id === contact.id ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-200'}`}>{contact.name}</h3>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{contact.time}</span>
                  </div>
                  <p className={`text-sm truncate ${contact.unread ? 'font-bold' : ''} ${selectedContact?.id === contact.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400'}`}>{contact.lastMessage}</p>
                  {contact.unread && <div className="mt-1 text-xs text-teal-500 dark:text-teal-400">New messages</div>}
                </div>
              )) : <p className="p-4 text-sm text-slate-500 dark:text-slate-400">No contacts found.</p>}
            </nav>
          )}
        </aside>

        {/* Message Thread Area */}
        <main className={`flex-grow flex flex-col bg-slate-50 dark:bg-slate-850 ${!selectedContact ? 'hidden md:flex' : 'flex'}`}>
          {selectedContact ? (
            <>
              <header className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center">
                {/* Back button for mobile */} 
                <CustomButton variant='ghost' size='sm' className="md:hidden mr-2 dark:text-slate-300 dark:hover:bg-slate-700" onClick={() => setSelectedContact(null)}>←</CustomButton>
                <UserCircleIcon className="w-8 h-8 text-slate-500 dark:text-slate-400 mr-3" />
                <div>
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{selectedContact.name}</h2>
                    <p className="text-xs text-teal-600 dark:text-teal-400">{selectedContact.role || 'Patient'} {selectedContact.status && `(${selectedContact.status})`}</p>
                </div>
              </header>
              
              <div className="flex-grow p-4 space-y-4 overflow-y-auto scroll-smooth">
                {(messages[selectedContact.id] || []).map(message => (
                  <div key={message.id} className={`flex ${message.sender === 'Dr. Smith' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow ${message.sender === 'Dr. Smith' ? 'bg-teal-500 text-white dark:bg-teal-600' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100'}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'Dr. Smith' ? 'text-teal-100 dark:text-teal-300 text-right' : 'text-slate-400 dark:text-slate-500 text-left'}`}>{message.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-center space-x-2">
                  <textarea 
                    ref={messageInputRef}
                    placeholder="Type your message..." 
                    rows="1"
                    className={`${inputBaseClass} flex-grow resize-none max-h-24 pr-10`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <CustomButton variant="primary" size="icon" onClick={handleSendMessage} aria-label="Send message">
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </CustomButton>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
              <ChatBubbleLeftEllipsisIcon className="w-24 h-24 text-slate-300 dark:text-slate-600 mb-4" /> 
              <h3 className="text-xl font-semibold">Select a conversation</h3>
              <p>Choose a contact from the list to start messaging.</p>
            </div>
          )}
        </main>
      </div>
      {/* Add a custom CSS class in index.css or global for --header-height if not already defined */}
      <style>{`
        :root {
            --header-height: 65px; /* Example, adjust to actual header height */
        }
      `}</style>
    </div>
  );
}

export default DoctorMessagesPage;