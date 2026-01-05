'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '@/components/Dropdown';
import ChatBubble from '@/components/ChatBubble';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function AskAnythingPage() {
  const [technology, setTechnology] = useState('');
  const [depth, setDepth] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you understand any concept. Choose a technology and depth level, then ask your question.',
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const technologies = ['Node.js', 'React', 'Java', 'SQL', 'Python', 'TypeScript'];
  const depths = ['Beginner', 'Intermediate', 'Advanced'];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !technology || !depth) return;

    // Add user message
    const userMessage: Message = {
      id: String(messages.length + 1),
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `That's a great question about ${technology}! This concept is fundamental to understanding how modern applications work. Let me break it down for you in a ${depth.toLowerCase()} friendly way. First, it's important to understand the basic principles, then we can move into more advanced topics.`,
        `In ${technology}, this is typically handled by... Here are some key points to remember: 1) The core concept, 2) Real-world applications, 3) Common pitfalls to avoid. Would you like me to elaborate on any of these?`,
        `Great question! At a ${depth.toLowerCase()} level, here's how this works. Think of it like... This analogy will help you understand the more complex aspects. In practice, developers often...`,
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: String(messages.length + 2),
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Ask Anything</h1>

          {/* Dropdowns */}
          <div className="grid md:grid-cols-2 gap-6">
            <Dropdown
              label="Select Technology"
              options={technologies}
              value={technology}
              onChange={setTechnology}
              placeholder="Choose a technology"
            />
            <Dropdown
              label="Select Depth"
              options={depths}
              value={depth}
              onChange={setDepth}
              placeholder="Choose depth level"
            />
          </div>

          {technology && depth && (
            <p className="mt-4 text-sm text-green-600 font-medium">
              ✓ Ready to ask questions about {technology} at {depth} level
            </p>
          )}
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
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {/* Note */}
            {!technology || !depth ? (
              <Card className="bg-yellow-50 border-yellow-200">
                <p className="text-sm text-yellow-800">
                  👆 Please select a technology and depth level above to start asking questions.
                </p>
              </Card>
            ) : null}

            {/* Input */}
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  technology && depth
                    ? `Ask anything about ${technology}...`
                    : 'Select options above to start'
                }
                disabled={!technology || !depth || isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || !technology || !depth || isLoading}
                className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isLoading ? '⏳' : 'Send'}
              </button>
            </div>

            {/* Suggestion Cards */}
            {messages.length === 1 && (
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Popular questions:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    'What is the difference between callbacks and promises?',
                    'How do I optimize database queries?',
                    'What are best practices for error handling?',
                  ].map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(question)}
                      disabled={!technology || !depth}
                      className="p-3 text-left text-sm bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
