/**
 * History Panel Component
 * 
 * This component displays the user's challenge generation history.
 * It fetches and renders all previously generated challenges with
 * their solutions and explanations.
 * 
 * Features:
 * - Fetches user's challenge history from API
 * - Displays challenges in chronological order
 * - Shows loading and error states
 * - Includes retry functionality on error
 * - Renders challenges with explanations visible
 */

import "react"
import {useState, useEffect} from "react"
import {MCQChallenge} from "../challenge/MCQChallenge.jsx";
import {useApi} from "../utils/api.js";

/**
 * HistoryPanel Component
 * 
 * Renders the user's challenge generation history with proper loading
 * and error handling. Each challenge is displayed with its full details.
 * 
 * @returns {JSX.Element} History panel with challenges list or loading/error state
 */
export function HistoryPanel() {
    // Custom hook for making authenticated API requests
    const {makeRequest} = useApi()
    
    // State management for history data and UI states
    const [history, setHistory] = useState([])  // Array of challenge objects
    const [isLoading, setIsLoading] = useState(true)  // Loading state
    const [error, setError] = useState(null)  // Error message state

    // Fetch history data when component mounts
    useEffect(() => {
        fetchHistory()
    }, [])

    /**
     * Fetch the user's challenge history from the API
     * Updates the history state with retrieved challenges
     */
    const fetchHistory = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // Make API request to get user's challenge history
            const data = await makeRequest("my-history")
            console.log(data)
            setHistory(data.challenges)
        } catch (err) {
            setError("Failed to load history.")
        } finally {
            setIsLoading(false)
        }
    }

    // Loading state display
    if (isLoading) {
        return <div className="loading">Loading history...</div>
    }

    // Error state display with retry option
    if (error) {
        return <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchHistory}>Retry</button>
        </div>
    }

    // Main history panel render
    return (
        <div className="history-panel">
            <h2>History</h2>
            
            {/* Display message if no history exists */}
            {history.length === 0 ? (
                <p>No challenge history</p>
            ) : (
                /* Render list of challenges */
                <div className="history-list">
                    {history.map((challenge) => {
                        return (
                            <MCQChallenge
                                challenge={challenge}
                                key={challenge.id}
                                showExplanation  // Always show explanations in history
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}