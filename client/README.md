Build a frontend-only Interview Preparation Platform using Next.js 15 (App Router) and Tailwind CSS.

GENERAL REQUIREMENTS:
- Use TypeScript
- Use App Router (app/ directory)
- No backend or API logic (use mock data and placeholders)
- Clean, modern EdTech UI
- Responsive design (mobile + desktop)
- Use reusable components
- Use Tailwind CSS only (no UI libraries)

APP STRUCTURE:
Create the following pages and layouts:

1. Landing Page (/)
   - App name: "Interview Prep Pro"
   - Short tagline: "AI-powered Interview Practice with Real Follow-ups"
   - Buttons:
     - Learn Mode
     - Interview Mode
     - Ask Anything
   - Clean hero section with gradient background

2. Learn Mode (/learn)
   - Dropdowns:
     - Select Technology (Node.js, React, Java, SQL)
     - Select Topic (Event Loop, JWT, Indexing, Hooks, etc.)
     - Select Depth (Beginner, Intermediate, Advanced)
   - "Start Learning" button
   - Output section:
     - Placeholder cards for:
       - Concept Explanation
       - Real-world Example
       - Common Interview Mistakes
   - Use loading skeletons for AI response placeholders

3. Interview Setup Page (/interview/setup)
   - Select Role (Node.js Developer, Backend Developer, Full Stack)
   - Select Level (Junior, Mid, Senior)
   - Multi-select Topics (Event Loop, Auth, Databases, Performance)
   - "Continue" button

4. Interview Instructions Page (/interview/instructions)
   - Title: "Interview Instructions"
   - Bullet points:
     - Duration: 10 minutes
     - No hints or feedback during interview
     - Questions adapt based on your answers
     - Feedback will be given at the end
   - Buttons:
     - Start Interview
     - Go Back

5. Interview Session Page (/interview/session)
   - Chat-style UI:
     - Left: AI messages
     - Right: User messages
   - Input box:
     - Text input
     - Send button
     - Microphone icon (UI only, no logic)
   - Timer UI (10-minute countdown, static for now)
   - Use mock interview questions and answers
   - Scrollable chat container

6. Feedback Page (/interview/feedback)
   - Sections:
     - Interview Summary
     - Score Cards:
       - Technical Depth
       - Clarity
       - Confidence
     - Strengths & Weaknesses
     - Knowledge Map (simple grid or tags)
   - Use progress bars and cards

7. Ask Anything Page (/ask)
   - Chatbot-style UI
   - Dropdown:
     - Select Technology
     - Select Depth
   - Input field for user questions
   - AI response placeholder
   - Teaching-style layout (not interview style)

COMPONENT REQUIREMENTS:
- Navbar (App name + navigation links)
- Reusable:
  - Button
  - Card
  - Dropdown
  - ChatBubble
  - ProgressBar
- Use a consistent color theme

STATE MANAGEMENT:
- Use React useState only
- Use mock data for all responses
- No API calls

STYLING:
- Use Tailwind CSS
- Soft shadows
- Rounded corners
- Subtle animations (hover, focus)
- Professional EdTech look

FOLDER STRUCTURE:
- app/
  - page.tsx
  - learn/
  - interview/
    - setup/
    - instructions/
    - session/
    - feedback/
  - ask/
- components/
- styles/

GOAL:
The frontend should look complete and demo-ready, even without backend integration.
