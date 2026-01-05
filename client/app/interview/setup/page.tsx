'use client';

import { useState } from 'react';
import Link from 'next/link';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function InterviewSetup() {
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const roles = ['Node.js Developer', 'Backend Developer', 'Full Stack Developer', 'Frontend Developer'];
  const levels = ['Junior', 'Mid', 'Senior'];
  const topics = ['Event Loop', 'Auth', 'Databases', 'Performance', 'Security', 'Caching'];

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const canContinue = role && level && selectedTopics.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Interview Setup</h1>
          <p className="text-xl text-gray-600">
            Configure your interview to match your experience level and goals
          </p>
        </div>

        {/* Setup Form */}
        <Card>
          <div className="space-y-8">
            {/* Select Role */}
            <div>
              <Dropdown
                label="Select Role"
                options={roles}
                value={role}
                onChange={setRole}
                placeholder="Choose your role"
              />
            </div>

            {/* Select Level */}
            <div>
              <Dropdown
                label="Select Level"
                options={levels}
                value={level}
                onChange={setLevel}
                placeholder="Choose your level"
              />
            </div>

            {/* Multi-select Topics */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Select Topics (Choose at least one)
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-4 py-3 rounded-lg border-2 transition duration-200 text-left font-medium ${
                      selectedTopics.includes(topic)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                          selectedTopics.includes(topic)
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedTopics.includes(topic) && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </div>
                      {topic}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Selected: {selectedTopics.length} / {topics.length}
              </p>
            </div>

            {/* Interview Info */}
            <Card variant="highlighted">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Interview Details:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>⏱️ Duration: 10 minutes</li>
                  <li>📊 Questions adapt based on your answers</li>
                  <li>🔊 Microphone input support</li>
                  <li>📝 Comprehensive feedback after completion</li>
                </ul>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Link href="/">
                <Button variant="outline">
                  Go Back
                </Button>
              </Link>
              <Link href={canContinue ? "/interview/instructions" : "#"}>
                <Button
                  variant="primary"
                  className={canContinue ? '' : 'opacity-50 cursor-not-allowed'}
                >
                  Continue →
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
