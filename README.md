# AI Coding Challenge Generator

A full-stack web application that generates coding challenges using AI. Users can create personalized coding questions with multiple-choice answers across different difficulty levels, track their challenge history, and manage their generation quota.

## 🚀 Features

- **AI-Powered Challenge Generation**: Uses Google's Gemini AI to create coding challenges
- **Difficulty Levels**: Easy, Medium, and Hard coding questions
- **User Authentication**: Secure authentication using Clerk
- **Challenge History**: Track previously generated challenges
- **Quota Management**: Daily usage limits with automatic resets
- **Responsive UI**: Modern React frontend with clean design

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (for development)
- **Google Generative AI** - AI challenge generation
- **Python-dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have:
- **Node.js** (v18 or higher)
- **Python** (3.12 or higher)
- **uv** (Python package manager) or pip
- **Google AI Studio API Key** - Get one at [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Clerk Account** - Set up at [Clerk.dev](https://clerk.dev)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/nicanornicolas/AI-APP.git
cd ai-app
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies (using uv)
uv sync

# Or using pip
# pip install -r requirements.txt

# Create .env file in backend/src/
# Add your environment variables:
```

Create `backend/src/.env`:
```env
GOOGLE_API_KEY=your_google_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_KEY=your_clerk_jwt_public_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Start the Backend
```bash
cd backend

# Activate virtual environment (if using uv)
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Start the server
python main.py
# Or
uvicorn src.app:app --reload --port 8000
```

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/src/.env`)
- `GOOGLE_API_KEY` - Your Google AI Studio API key
- `CLERK_SECRET_KEY` - Clerk secret key for authentication
- `JWT_KEY` - Clerk JWT public key for token verification
- `CLERK_WEBHOOK_SECRET` - Webhook secret for Clerk events

#### Frontend
Configure your Clerk publishable key in your frontend environment or directly in the Clerk configuration.

## 📚 API Endpoints

### Challenge Generation
- `POST /api/generate-challenge` - Generate a new coding challenge
  - Body: `{"difficulty": "easy|medium|hard"}`
  - Returns: Challenge object with title, options, correct answer, and explanation

### User Management  
- `GET /api/quota` - Get user's remaining quota
- `GET /api/my-history` - Get user's challenge history

### Webhooks
- `POST /webhooks/clerk` - Clerk webhook for user events

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Linting
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
flake8 src/
```

## 🚀 Deployment

### Backend
The backend can be deployed to any Python-compatible platform:
- **Railway** - Easy deployment with automatic builds
- **Heroku** - Traditional PaaS deployment
- **AWS Lambda** - Serverless deployment
- **DigitalOcean App Platform** - Container-based deployment

### Frontend
The frontend can be deployed to static hosting services:
- **Vercel** - Optimized for React applications
- **Netlify** - JAMstack deployment
- **GitHub Pages** - Free static hosting

## 📁 Project Structure

```
ai-app/
├── backend/
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── database/        # Database models and utilities
│   │   ├── ai_generator.py  # AI challenge generation logic
│   │   ├── app.py          # FastAPI application setup
│   │   └── utils.py        # Utility functions
│   ├── pyproject.toml      # Python dependencies
│   └── main.py            # Application entry point
└── frontend/
    ├── src/
    │   ├── auth/           # Authentication components
    │   ├── challenge/      # Challenge generation UI
    │   ├── history/        # Challenge history UI
    │   ├── layout/         # App layout components
    │   └── utils/          # Utility functions
    ├── package.json        # Node.js dependencies
    └── vite.config.js     # Vite configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **"google.generativeai module not found"**
   - Make sure to install dependencies: `uv sync` or `pip install google-generativeai`

2. **"API key not found"**
   - Ensure your `.env` file is in `backend/src/` directory
   - Verify your Google API key is valid

3. **"Authentication failed"**
   - Check your Clerk configuration
   - Verify webhook secrets match

4. **CORS errors**
   - Ensure your frontend URL is allowed in CORS settings
   - Check if backend is running on the correct port

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/ai-app/issues) on GitHub. 