import { useState, useEffect } from 'react';
import { getDoctorMessages } from '../services/doctorService';

export default function useDoctorMessages() {
  const [messages, setMessages] = useState({});
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getDoctorMessages()
      .then(msgList => {
        // Group messages by sender
        const grouped = msgList.reduce((acc, msg) => {
          const key = msg.sender;
          if (!acc[key]) acc[key] = [];
          acc[key].push(msg);
          return acc;
        }, {});
        setMessages(grouped);
        // Build contacts list
        const list = Object.entries(grouped).map(([sender, msgs]) => {
          const last = msgs[msgs.length - 1];
          return {
            id: sender,
            name: sender,
            lastMessage: last.content,
            time: new Date(last.timestamp).toLocaleTimeString(),
            timeRaw: last.timestamp,
            unread: false,
            role: msgs[0].sender === 'Dr. Smith' ? 'Doctor' : 'Patient'
          };
        });
        setContacts(list);
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { messages, contacts, isLoading, error, setMessages };
} 