'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';

export default function FeedbackPage() {
  const scores = {
    technicalDepth: 78,
    clarity: 85,
    confidence: 72,
  };

  const strengths = [
    'Strong understanding of core concepts',
    'Good use of real-world examples',
    'Clear explanation of trade-offs',
  ];

  const weaknesses = [
    'Could improve on edge case handling',
    'Need to explain assumptions clearly',
    'Provide more specific performance metrics',
  ];

  const knowledgeMap = [
    { topic: 'Event Loop', level: 'Strong' },
    { topic: 'Concurrency', level: 'Intermediate' },
    { topic: 'Memory Management', level: 'Strong' },
    { topic: 'Error Handling', level: 'Intermediate' },
    { topic: 'Performance', level: 'Beginner' },
    { topic: 'Testing', level: 'Intermediate' },
  ];

  const overallScore = Math.round(
    (scores.technicalDepth + scores.clarity + scores.confidence) / 3
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Interview Feedback</h1>
          <p className="text-xl text-gray-600">
            Here's your detailed performance analysis
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-12 bg-linear-to-br from-green-50 to-blue-50 border-2 border-green-200">
          <div className="text-center space-y-4">
            <p className="text-gray-600 text-lg">Overall Performance</p>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white">
              <div className="text-center">
                <div className="text-5xl font-bold">{overallScore}</div>
                <div className="text-sm">/ 100</div>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {overallScore >= 80
                ? '🌟 Excellent Performance!'
                : overallScore >= 70
                ? '👍 Good Performance'
                : '💪 Keep Practicing'}
            </p>
          </div>
        </Card>

        {/* Score Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Technical Depth</h3>
              <ProgressBar
                label="Knowledge Assessment"
                value={scores.technicalDepth}
                color="blue"
              />
              <p className="text-sm text-gray-600 mt-4">
                You demonstrated solid understanding of the core concepts and were able to explain the fundamentals effectively.
              </p>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Clarity</h3>
              <ProgressBar
                label="Communication Score"
                value={scores.clarity}
                color="green"
              />
              <p className="text-sm text-gray-600 mt-4">
                Your explanations were clear and well-structured. You communicated your ideas effectively.
              </p>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Confidence</h3>
              <ProgressBar
                label="Confidence Level"
                value={scores.confidence}
                color="purple"
              />
              <p className="text-sm text-gray-600 mt-4">
                You showed good confidence in your answers with room for improvement in edge cases.
              </p>
            </div>
          </Card>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <Card variant="highlighted">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>✅ Strengths</span>
              </h3>
              <ul className="space-y-3">
                {strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Weaknesses */}
          <Card variant="highlighted">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>📈 Areas for Improvement</span>
              </h3>
              <ul className="space-y-3">
                {weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Knowledge Map */}
        <Card className="mb-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Knowledge Map</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {knowledgeMap.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    item.level === 'Strong'
                      ? 'bg-green-50 border-green-200'
                      : item.level === 'Intermediate'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{item.topic}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.level === 'Strong'
                          ? 'bg-green-200 text-green-800'
                          : item.level === 'Intermediate'
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-12 bg-linear-to-r from-blue-50 to-purple-50">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Interview Summary</h3>
            <p className="text-gray-700 leading-relaxed">
              You completed the interview with a strong performance. Your understanding of the core concepts is solid, and your communication was clear. To improve further, focus on handling edge cases and providing more specific metrics when discussing performance optimizations. Keep practicing with different scenarios to build more confidence.
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/learn" className="flex-1">
            <Button variant="secondary" size="lg" className="w-full">
              📚 Learn More
            </Button>
          </Link>
          <Link href="/interview/setup" className="flex-1">
            <Button variant="primary" size="lg" className="w-full">
              🎯 Practice Again
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
