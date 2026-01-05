Build a backend for an AI-powered Interview Preparation Platform using Node.js, TypeScript, Express, MongoDB, and LangChain.js.

GENERAL REQUIREMENTS:
- Use Node.js with TypeScript
- Use Express.js
- Follow clean architecture (routes, controllers, services)
- Use environment variables for secrets
- No frontend code
- REST API based
- Use async/await
- Ready for future deployment (Render/Docker)

---------------------------
CORE FEATURES & MODES
---------------------------

MODE 1: Learn Mode (Conceptual Learning)
---------------------------------------
Endpoint:
POST /api/learn

Request Body:
- technology (string)
- topic (string)
- depth (Beginner | Intermediate | Advanced)

Behavior:
- Use LangChain to generate explanations
- Explain concepts progressively
- Include:
  - Concept explanation
  - Real-world example
  - Common interview mistakes
- Return structured JSON response

---------------------------

MODE 2: Interview Mode (Main Feature)
------------------------------------

1. Interview Setup
POST /api/interview/start

Request Body:
- userId
- role (Node.js Developer, Backend Developer, etc.)
- level (Junior | Mid | Senior)
- topics (array)

Behavior:
- Create interview session in MongoDB
- Initialize scores (technicalDepth, clarity, confidence)
- Return sessionId

---------------------------

2. Interview Conversation (Multi-turn)
POST /api/interview/message

Request Body:
- sessionId
- userMessage

Behavior:
- Fetch full chat history from MongoDB
- Pass conversation history to LangChain
- AI must behave like a Senior Technical Interviewer
- Ask follow-up questions if depth is lacking
- DO NOT teach or give feedback
- Store AI + user messages in MongoDB
- Return next interview question

---------------------------

MODE 3: Feedback & Evaluation (Post Interview)
----------------------------------------------
POST /api/interview/feedback

Request Body:
- sessionId

Behavior:
- Fetch full interview transcript
- Analyze responses using LangChain
- Generate:
  - Technical Depth score
  - Clarity score
  - Confidence score
  - Strengths
  - Weaknesses
  - Improvement suggestions
- Store feedback in MongoDB
- Return feedback report

---------------------------

MODE 4: Ask Anything Mode (AI Tutor)
-----------------------------------
POST /api/ask

Request Body:
- technology
- depth
- question

Behavior:
- AI acts as a tutor
- Teaching is allowed
- Clear explanations based on depth
- Return structured answer

---------------------------
CONVERSATION MEMORY
---------------------------
- Store all messages in MongoDB
- Each message should include:
  - sessionId
  - role (user / ai)
  - content
  - topic
  - timestamp
- Use this history for multi-turn context

---------------------------
VECTOR MEMORY (OPTIONAL / ADVANCED)
---------------------------
- Integrate MongoDB Atlas Vector Search
- Store embeddings for:
  - Interview answers
  - Feedback analysis
- Use embeddings for:
  - Weakness detection
  - Topic similarity

---------------------------
PROMPT DESIGN
---------------------------
Create separate system prompts for:
1. Interviewer Mode
   - Senior engineer tone
   - Drill-down questions
   - No teaching
   - Adaptive follow-ups

2. Learn Mode
   - Teaching allowed
   - Beginner → Advanced explanation

3. Feedback Mode
   - Analytical evaluation
   - Honest scoring

4. Ask Anything Mode
   - Friendly AI tutor

---------------------------
DATABASE SCHEMA
---------------------------
Collections:
- users
- interview_sessions
- chat_history
- feedback_reports
- knowledge_map

---------------------------
FOLDER STRUCTURE
---------------------------
src/
- server.ts
- app.ts
- config/
  - db.ts
- routes/
  - learn.routes.ts
  - interview.routes.ts
  - ask.routes.ts
- controllers/
- services/
  - langchain.service.ts
- models/
- prompts/
- utils/

---------------------------
GOAL
---------------------------
The backend should:
- Support all frontend flows
- Be modular and scalable
- Be ready to connect to frontend
- Clearly demonstrate AI interview intelligence
