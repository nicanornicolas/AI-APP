/**
 * Main Application Component
 * 
 * This is the root component that sets up the application structure,
 * routing, and authentication context using Clerk.
 * 
 * The app uses React Router for client-side navigation and
 * Clerk for user authentication and session management.
 */

import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx"
import {Routes, Route} from "react-router-dom"
import {Layout} from "./layout/Layout.jsx"
import {ChallengeGenerator} from "./challenge/ChallengeGenerator.jsx";
import {HistoryPanel} from "./history/HistoryPanel.jsx";
import {AuthenticationPage} from "./auth/AuthenticationPage.jsx";
import './App.css'

function App() {
    return (
        // Wrap the entire app with Clerk authentication provider
        <ClerkProviderWithRoutes>
            <Routes>
                {/* Public authentication routes - no layout wrapper */}
                <Route path="/sign-in/*" element={<AuthenticationPage />} />
                <Route path="/sign-up" element={<AuthenticationPage />} />
                
                {/* Protected routes - wrapped with main layout */}
                <Route element={<Layout />}>
                    {/* Home page - Challenge Generator */}
                    <Route path="/" element={<ChallengeGenerator />}/>
                    
                    {/* Challenge History page */}
                    <Route path="/history" element={<HistoryPanel />}/>
                </Route>
            </Routes>
        </ClerkProviderWithRoutes>
    )
}

export default App