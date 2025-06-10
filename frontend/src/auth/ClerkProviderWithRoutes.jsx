/**
 * Clerk Authentication Provider with Router Setup
 * 
 * This component wraps the entire application with Clerk's authentication
 * context and React Router's browser router. It provides authentication
 * state and routing capabilities to all child components.
 * 
 * Environment Variables Required:
 * - VITE_CLERK_PUBLISHABLE_KEY: Clerk publishable key for frontend authentication
 */

import {ClerkProvider} from "@clerk/clerk-react"
import {BrowserRouter} from "react-router-dom";

// Get Clerk publishable key from environment variables
// This key is safe to expose in the frontend as it's meant to be public
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Validate that the required environment variable is present
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

/**
 * ClerkProviderWithRoutes Component
 * 
 * Combines Clerk authentication provider with React Router's BrowserRouter
 * to provide both authentication context and routing capabilities.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Clerk provider wrapped with browser router
 */
export default function ClerkProviderWithRoutes({children}) {
  return (
    // Clerk provider handles authentication state and user session
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* Browser router enables client-side navigation */}
      <BrowserRouter>{children}</BrowserRouter>
    </ClerkProvider>
  )
}