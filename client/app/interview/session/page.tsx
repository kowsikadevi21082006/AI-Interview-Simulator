'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ChatBubble from '@/components/ChatBubble';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function InterviewSession() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Tell me about your experience with event loops in Node.js.',
      isUser: false,
      timestamp: '10:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [interviewComplete, setInterviewComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setInterviewComplete(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: String(messages.length + 1),
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'That\'s a good explanation. Can you elaborate on how this applies to handling multiple concurrent requests?',
        'Interesting perspective. How would you handle performance optimization in this scenario?',
        'Good point. Now, how would you test this functionality in a production environment?',
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: String(messages.length + 2),
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (interviewComplete) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center space-y-8">
            <div className="text-6xl">✅</div>
            <h1 className="text-4xl font-bold text-gray-900">Interview Completed!</h1>
            <p className="text-xl text-gray-600">
              Great job! Your interview has been completed. Let's see how you performed.
            </p>
            <Link href="/interview/feedback">
              <Button size="lg" variant="primary">
                View Your Feedback →
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Timer */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Interview Session</h1>
          <div
            className={`text-3xl font-bold ${
              timeLeft < 120 ? 'text-red-600 animate-pulse' : 'text-blue-600'
            }`}
          >
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your answer..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Send
            </button>
            <button className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition" title="Microphone (UI only)">
              🎤
            </button>
          </div>

          {/* End Interview Button */}
          <div className="mt-4">
            <Link href="/interview/feedback">
              <Button
                variant="outline"
                className="w-full"
              >
                End Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
