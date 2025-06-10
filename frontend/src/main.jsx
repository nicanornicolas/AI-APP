/**
 * Application Entry Point
 * 
 * This is the main entry file for the React application. It sets up the React root,
 * validates required environment variables, and renders the main App component
 * with React's StrictMode enabled for development debugging.
 * 
 * Environment Variables Required:
 * - VITE_CLERK_PUBLISHABLE_KEY: Clerk's publishable key for authentication
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Validate that required environment variables are present
// This key is required for Clerk authentication to work
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// Create React root and render the application
// StrictMode enables additional checks and warnings for development
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)