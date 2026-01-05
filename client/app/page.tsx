'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-blue-50 py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Interview Prep Pro
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                AI-powered Interview Practice with Real Follow-ups
              </p>
            </div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Master your technical skills with interactive learning, realistic interview simulations, and personalized feedback.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-8">
              <Link href="/learn">
                <Button size="lg" variant="primary">
                  📚 Learn Mode
                </Button>
              </Link>
              <Link href="/interview/setup">
                <Button size="lg" variant="secondary">
                  🎯 Interview Mode
                </Button>
              </Link>
              <Link href="/ask">
                <Button size="lg" variant="outline">
                  ❓ Ask Anything
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the learning approach that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Learn Mode Card */}
            <Card variant="highlighted">
              <div className="text-center space-y-4">
                <div className="text-4xl">📚</div>
                <h3 className="text-xl font-bold text-gray-900">Learn Mode</h3>
                <p className="text-gray-700">
                  Deep dive into concepts with explanations, real-world examples, and common interview mistakes.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li>✓ Concept Explanations</li>
                  <li>✓ Real-world Examples</li>
                  <li>✓ Interview Tips</li>
                  <li>✓ Multiple Depth Levels</li>
                </ul>
              </div>
            </Card>

            {/* Interview Mode Card */}
            <Card variant="highlighted">
              <div className="text-center space-y-4">
                <div className="text-4xl">🎯</div>
                <h3 className="text-xl font-bold text-gray-900">Interview Mode</h3>
                <p className="text-gray-700">
                  Practice realistic interviews with adaptive questions and comprehensive feedback.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li>✓ Adaptive Questions</li>
                  <li>✓ Timed Sessions</li>
                  <li>✓ Real Feedback</li>
                  <li>✓ Performance Tracking</li>
                </ul>
              </div>
            </Card>

            {/* Ask Anything Card */}
            <Card variant="highlighted">
              <div className="text-center space-y-4">
                <div className="text-4xl">❓</div>
                <h3 className="text-xl font-bold text-gray-900">Ask Anything</h3>
                <p className="text-gray-700">
                  Get instant answers to your technical questions in a conversational format.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li>✓ Instant Answers</li>
                  <li>✓ Follow-up Questions</li>
                  <li>✓ Code Examples</li>
                  <li>✓ Custom Topics</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start practicing today and get personalized feedback to improve your technical skills.
          </p>
          <Link href="/learn">
            <Button size="lg" variant="primary" className="bg-white text-blue-600 hover:bg-gray-50">
              Get Started Now →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
