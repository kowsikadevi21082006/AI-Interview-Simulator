/*
  LangChain service with intelligent template-based responses.
  Generates realistic, context-aware answers for interview prep.
*/

import { IChatMessage } from '../models/chatHistory.model';

export default class LangChainService {
  static interviewerSystemPrompt = `You are a senior technical interviewer. Ask concise, probing follow-up questions to evaluate depth. Do NOT teach or provide feedback during the interview. Keep tone professional and challenging.`;

  static learnSystemPrompt = `You are an AI tutor. Provide clear teaching explanations from beginner to advanced based on requested depth. Use examples and common pitfalls.`;

  static feedbackSystemPrompt = `You are an analytical evaluator. Assess the transcript and produce numeric scores for technical depth, clarity, and confidence. Provide strengths, weaknesses, and suggestions.`;

  static askSystemPrompt = `You are a friendly tutor. Answer the user's question based on the selected technology and depth.`;

  private static generateRandomScore(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static getFollowUpQuestions(technology: string, topic?: string): string[] {
    const baseQuestions = [
      'How would you implement this in production?',
      'What are the performance implications?',
      'Can you explain the trade-offs involved?',
      'How does this compare to other approaches?',
      'What are potential security concerns?',
      'How would you test this?',
    ];
    
    const techSpecific: Record<string, string[]> = {
      'JavaScript': ['How does this relate to the event loop?', 'What about async/await?', 'How does this work with closures?'],
      'Python': ['How does this relate to decorators?', 'What about generators?', 'How does this work with type hints?'],
      'React': ['How does this affect re-renders?', 'What about hooks?', 'How does this impact performance?'],
      'TypeScript': ['How does this affect type inference?', 'What about generics?', 'How does this compile to JavaScript?'],
      'Java': ['How does this relate to memory management?', 'What about garbage collection?', 'How does this work with threads?'],
      'SQL': ['How does this affect query performance?', 'What about indexing?', 'How does this scale?'],
    };
    
    const relevant = techSpecific[technology] || baseQuestions;
    return [...relevant, ...baseQuestions].slice(0, 3);
  }

  static async generateLearn(technology: string, topic: string, depth: string) {
    const depthGuide: Record<string, string> = {
      'beginner': 'fundamental concepts, basic syntax, and simple examples',
      'intermediate': 'practical patterns, common use cases, and best practices',
      'advanced': 'optimization techniques, edge cases, and performance considerations',
    };

    const conceptMap: Record<string, Record<string, string>> = {
      'JavaScript': {
        'closures': 'A closure is a function that has access to the outer scope even after it has returned. Every function in JavaScript forms a closure.',
        'promises': 'Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value.',
        'event loop': 'The event loop checks the call stack and the callback queue. If the stack is empty, it moves callbacks to the stack.',
        'async/await': 'Async/await provides a cleaner way to work with asynchronous code compared to .then() chains.',
      },
      'React': {
        'hooks': 'Hooks allow you to use state and other React features without writing a class component.',
        'virtual dom': 'React maintains a virtual representation of the real DOM for efficient updates and reconciliation.',
        'state management': 'State management in React involves managing component state with useState or external libraries.',
        'performance': 'React optimization includes memoization, lazy loading, and code splitting.',
      },
      'TypeScript': {
        'types': 'Types in TypeScript provide compile-time checking and better IDE support for JavaScript code.',
        'generics': 'Generics allow you to create reusable components with type-safe operations.',
        'interfaces': 'Interfaces define contracts for objects, ensuring consistent structure across your codebase.',
        'decorators': 'Decorators are functions that modify classes or properties at design time.',
      },
    };

    const concept = (conceptMap[technology]?.[topic.toLowerCase()] || 
      `**${topic}** is a key concept in ${technology} development.`) + 
      ` At ${depth} level, focus on ${depthGuide[depth] || 'core principles and practical applications'}.`;

    return {
      concept,
      example: `Example: When working with ${topic} in ${technology}, remember to consider performance and maintainability. A typical pattern is to ${topic === 'closures' ? 'create a function that returns another function' : 'use established best practices and avoid common pitfalls'}.`,
      mistakes: [
        `Misunderstanding how ${topic} works in different contexts`,
        `Not considering performance implications of ${topic}`,
        `Overcomplicating ${topic} when simpler solutions exist`,
      ],
    };
  }

  static async generateInterviewerNextQuestion(history: IChatMessage[]) {
    const lastUser = [...history].reverse().find((m) => m.role === 'user');
    const lastUserContent = lastUser?.content || '';

    // Context-aware questions based on answer length and type
    if (lastUserContent.length < 50) {
      return 'Can you provide more detail with a specific example?';
    }

    if (lastUserContent.toLowerCase().includes('don\'t know') || 
        lastUserContent.toLowerCase().includes('not sure')) {
      return 'That\'s okay. Let me ask about a related concept that might help.';
    }

    const contextQuestions = [
      'How would you handle edge cases in this approach?',
      'What about performance and scalability concerns?',
      'Can you walk me through the implementation step by step?',
      'How does this compare to alternative solutions?',
      'What testing strategy would you use for this?',
      'How would you optimize this for production?',
      'What are the security implications you\'d consider?',
      'How would you explain this to a junior developer?',
    ];

    return contextQuestions[Math.floor(Math.random() * contextQuestions.length)];
  }

  static async analyzeFeedback(history: IChatMessage[]) {
    // Count user messages and analyze depth
    const userMessages = history.filter((m) => m.role === 'user');
    const avgLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / (userMessages.length || 1);
    
    // Score based on conversation depth
    const baseDepth = Math.min(100, 50 + (avgLength / 10));
    const baseClariy = Math.min(100, 60 + (userMessages.length * 5));
    const baseConfidence = Math.min(100, 55 + (avgLength / 15));

    return {
      technicalDepth: Math.round(baseDepth + this.generateRandomScore(-10, 10)),
      clarity: Math.round(baseClariy + this.generateRandomScore(-10, 10)),
      confidence: Math.round(baseConfidence + this.generateRandomScore(-10, 10)),
      strengths: [
        'Clear problem-solving approach',
        'Good communication of ideas',
        'Structured thinking process',
        'Demonstrates practical knowledge',
      ].slice(0, 3),
      weaknesses: [
        'Could explore edge cases deeper',
        'Consider discussing performance implications',
        'Elaborate on testing strategies',
        'Discuss scalability considerations',
      ].slice(0, 3),
      suggestions: [
        'Practice explaining concepts with real-world examples',
        'Study edge cases and error handling patterns',
        'Review performance optimization techniques',
        'Strengthen knowledge of related technologies',
      ].slice(0, 2),
    };
  }

  static async answerAskMode(technology: string, depth: string, question: string) {
    const depthLevel = {
      'beginner': 'basic principles and foundational concepts',
      'intermediate': 'practical patterns and real-world use cases',
      'advanced': 'optimization, edge cases, and advanced patterns',
    }[depth] || 'core concepts';

    const answers: Record<string, Record<string, string>> = {
      'JavaScript': {
        'closure': 'A closure is a function that retains access to its outer scope variables even after the outer function has returned. This is fundamental to JavaScript and enables many patterns like callbacks and module patterns.',
        'promise': 'A Promise is an object representing the eventual completion of an asynchronous operation. It can be in pending, fulfilled, or rejected state, enabling better handling of async code compared to callbacks.',
        'async': 'Async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code, improving readability and error handling.',
      },
      'React': {
        'hook': 'React Hooks are functions that let you "hook into" React state and lifecycle features from function components. useState, useEffect, and useContext are commonly used hooks.',
        'render': 'React renders components to the DOM. When state or props change, React re-renders the affected components using virtual DOM diffing for efficiency.',
        'state': 'State is mutable data in React components. Use useState hook for functional components or setState for class components to manage and update state.',
      },
      'TypeScript': {
        'type': 'Types in TypeScript provide static type checking, catching errors at compile time. Use type annotations like: let variable: string = "hello".',
        'interface': 'An interface defines a contract for object shapes. It specifies what properties and methods an object must have, enabling better code documentation and IDE support.',
        'generic': 'Generics allow you to write reusable components that work with multiple types while maintaining type safety. Use angle brackets: function<T>(arg: T): T.',
      },
    };

    const answer = (answers[technology]?.[question.toLowerCase()] ||
      `**${question}** is an important concept in ${technology}. At ${depthLevel}, you should understand ` +
      `the core purpose, how it's implemented, and when to use it. In ${technology} specifically, this relates to ` +
      `the broader ecosystem and best practices within the language or framework.`);

    return {
      answer,
      followUps: this.getFollowUpQuestions(technology, question),
    };
  }
}
