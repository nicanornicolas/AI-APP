/**
 * Authentication Page Component
 * 
 * This component renders the appropriate authentication form (sign-in or sign-up)
 * based on the current route. It uses Clerk's pre-built components for
 * a seamless authentication experience.
 * 
 * Routes handled:
 * - /sign-in/* - Sign-in form and related flows
 * - /sign-up - Sign-up form
 */

import {SignIn, SignUp} from "@clerk/clerk-react"
import {useLocation} from "react-router-dom";

/**
 * AuthenticationPage Component
 * 
 * Renders either SignIn or SignUp component based on the current URL path.
 * Provides a unified authentication experience for users.
 * 
 * @returns {JSX.Element} Authentication form component
 */
export function AuthenticationPage() {
    // Get current location to determine which auth component to render
    const location = useLocation();
    
    // Check if current path includes 'sign-up' to show registration form
    const isSignUp = location.pathname.includes('sign-up');

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {/* Render appropriate authentication component based on route */}
            {isSignUp ? <SignUp /> : <SignIn />}
        </div>
    );
}