/**
 * Main Layout Component
 * 
 * This component provides the main application layout with header navigation
 * and content area. It handles authentication-based rendering and navigation
 * using Clerk's authentication components.
 * 
 * Features:
 * - Responsive header with navigation links
 * - User authentication status display
 * - Protected route rendering
 * - Automatic redirect to sign-in for unauthenticated users
 */

import "react"
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react"
import {Outlet, Link, Navigate} from "react-router-dom"

/**
 * Layout Component
 * 
 * Provides the main application shell with header, navigation, and content area.
 * Uses Clerk's authentication state to control access and display appropriate UI.
 * 
 * @returns {JSX.Element} Main layout with header and content area
 */
export function Layout() {
    return (
        <div className="app-layout">
            {/* Application Header */}
            <header className="app-header">
                <div className="header-content">
                    {/* Application Title */}
                    <h1>Code Challenge Generator</h1>
                    
                    {/* Navigation Menu - Only visible when signed in */}
                    <nav>
                        <SignedIn>
                            {/* Main navigation links */}
                            <Link to="/">Generate Challenge</Link>
                            <Link to="/history">History</Link>
                            
                            {/* User profile button with dropdown menu */}
                            <UserButton/>
                        </SignedIn>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="app-main">
                {/* Redirect unauthenticated users to sign-in */}
                <SignedOut>
                    <Navigate to="/sign-in" replace/>
                </SignedOut>
                
                {/* Render page content for authenticated users */}
                <SignedIn>
                    {/* Outlet renders the matched child route component */}
                    <Outlet />
                </SignedIn>
            </main>
        </div>
    )
}