'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function InterviewInstructions() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Interview Instructions</h1>
          <p className="text-xl text-gray-600">
            Please review the following guidelines before starting
          </p>
        </div>

        {/* Instructions Card */}
        <Card>
          <div className="space-y-8">
            {/* Duration */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⏱️</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Duration: 10 Minutes</h3>
                  <p className="text-gray-700">
                    You will have 10 minutes to complete the interview. The timer will be displayed throughout your session. Make sure to manage your time wisely.
                  </p>
                </div>
              </div>
            </div>

            {/* No Hints */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🚫</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Hints or Feedback During Interview</h3>
                  <p className="text-gray-700">
                    To simulate a real interview experience, no hints or real-time feedback will be provided during the session. This helps ensure an authentic assessment of your knowledge.
                  </p>
                </div>
              </div>
            </div>

            {/* Adaptive Questions */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Questions Adapt Based on Your Answers</h3>
                  <p className="text-gray-700">
                    Our AI system evaluates your responses and adjusts the difficulty of subsequent questions accordingly. This ensures a personalized interview experience tailored to your skill level.
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="pb-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Feedback After Completion</h3>
                  <p className="text-gray-700">
                    Once you complete the interview, you'll receive detailed feedback including:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
                    <li>Technical depth assessment</li>
                    <li>Communication clarity score</li>
                    <li>Confidence level evaluation</li>
                    <li>Strengths and areas for improvement</li>
                    <li>Knowledge map visualization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <Card variant="highlighted">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Important Notes:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Keep your microphone ready if you plan to use voice input</li>
                  <li>• Ensure a stable internet connection</li>
                  <li>• Have a pen and paper handy if you need to sketch or work through problems</li>
                  <li>• Find a quiet environment free from distractions</li>
                  <li>• Do not refresh the page during the interview</li>
                </ul>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8">
              <Link href="/interview/setup">
                <Button variant="outline">
                  Go Back
                </Button>
              </Link>
              <Link href="/interview/session">
                <Button variant="primary" size="lg">
                  Start Interview →
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
