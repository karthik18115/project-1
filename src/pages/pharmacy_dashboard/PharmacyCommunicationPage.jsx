import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock conversations
const mockThreads = [
  { id: 1, doctor: 'Dr. Emily Carter', lastMessage: 'Please confirm stock for Amoxicillin', timestamp: '09:45 AM' },
  { id: 2, doctor: 'Dr. John Lee', lastMessage: 'Need update on Metformin refill', timestamp: '11:20 AM' },
];

export default function PharmacyCommunicationPage() {
  const [threads] = useState(mockThreads);
  const [selectedThread, setSelectedThread] = useState(null);

  return (
    <div className="flex h-full">
      {/* Thread List */}
      <aside className="w-64 p-4 border-r border-slate-200 dark:border-slate-700 space-y-2">
        <h2 className="text-xl font-semibold">Conversations</h2>
        <ul className="space-y-1 mt-2">
          {threads.map(t => (
            <li key={t.id}>
              <button
                onClick={() => setSelectedThread(t)}
                className="w-full text-left p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <p className="font-medium">{t.doctor}</p>
                <p className="text-xs text-slate-500">{t.lastMessage}</p>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Message Area */}
      <main className="flex-1 p-4 flex flex-col">
        {selectedThread ? (
          <>
            <header className="border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
              <h3 className="text-lg font-semibold">Chat with {selectedThread.doctor}</h3>
            </header>
            <div className="flex-1 overflow-y-auto space-y-4">
              {/* TODO: Render messages here */}
              <p className="text-sm text-slate-500">Message history will appear here.</p>
            </div>
            <div className="mt-4 flex">
              <input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 border rounded-l-md" />
              <Button variant="primary">Send</Button>
            </div>
          </>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <p className="text-slate-500">Select a conversation to start messaging.</p>
          </Card>
        )}
      </main>
    </div>
  );
} 