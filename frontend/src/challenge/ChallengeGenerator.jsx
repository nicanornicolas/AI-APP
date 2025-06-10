/**
 * ChallengeGenerator Component
 * 
 * Main component for generating AI-powered coding challenges.
 * Handles user input for difficulty selection, quota management,
 * and displays generated challenges.
 */

import "react"
import {useState, useEffect} from "react"
import {MCQChallenge} from "./MCQChallenge.jsx";
import {useApi} from "../utils/api.js"

export function ChallengeGenerator() {
    // State management for challenge generation
    const [challenge, setChallenge] = useState(null)  // Currently generated challenge
    const [isLoading, setIsLoading] = useState(false)  // Loading state for API calls
    const [error, setError] = useState(null)  // Error messages from API failures
    const [difficulty, setDifficulty] = useState("easy")  // Selected difficulty level
    const [quota, setQuota] = useState(null)  // User's remaining quota for today
    
    // Custom hook for making authenticated API requests
    const {makeRequest} = useApi()

    // Fetch user's quota on component mount
    useEffect(() => {
        fetchQuota()
    }, [])

    /**
     * Fetch the user's current quota from the API
     * Updates the quota state with remaining challenges for today
     */
    const fetchQuota = async () => {
        try {
            console.log("📊 [FRONTEND DEBUG] Fetching user quota...")
            const data = await makeRequest("quota")
            console.log("📊 [FRONTEND DEBUG] Quota response:", data)
            setQuota(data)
            console.log("📊 [FRONTEND DEBUG] Quota state updated")
        } catch (err) {
            console.error("❌ [FRONTEND DEBUG] Error fetching quota:", err)
            console.log(err)
        }
    }

    /**
     * Generate a new coding challenge using the selected difficulty
     * Makes a POST request to the backend API and updates the challenge state
     */
    const generateChallenge = async () => {
        console.log("🔄 [FRONTEND DEBUG] Generate challenge button clicked")
        console.log("🔄 [FRONTEND DEBUG] Selected difficulty:", difficulty)
        console.log("🔄 [FRONTEND DEBUG] Current quota:", quota)
        
        setIsLoading(true)
        setError(null)

        try {
            console.log("🚀 [FRONTEND DEBUG] Starting API request to generate-challenge")
            console.log("🚀 [FRONTEND DEBUG] Request payload:", {difficulty})
            
            // Make API request to generate challenge
            const data = await makeRequest("generate-challenge", {
                method: "POST",
                body: JSON.stringify({difficulty})
                }
            )
            
            console.log("✅ [FRONTEND DEBUG] API request successful")
            console.log("✅ [FRONTEND DEBUG] Response data:", data)
            console.log("✅ [FRONTEND DEBUG] Challenge title:", data?.title)
            
            // Check if this is the same challenge as before (debugging issue)
            if (challenge && challenge.title === data?.title) {
                console.warn("⚠️ [FRONTEND DEBUG] Same challenge returned! Possible caching or fallback issue")
                console.warn("⚠️ [FRONTEND DEBUG] Previous challenge:", challenge)
                console.warn("⚠️ [FRONTEND DEBUG] New challenge:", data)
            }
            
            // Update state with new challenge and refresh quota
            setChallenge(data)
            console.log("✅ [FRONTEND DEBUG] Challenge state updated")
            
            fetchQuota()  // Refresh quota after successful generation
            console.log("🔄 [FRONTEND DEBUG] Quota refresh initiated")
            
        } catch (err) {
            console.error("❌ [FRONTEND DEBUG] Error generating challenge:", err)
            console.error("❌ [FRONTEND DEBUG] Error message:", err.message)
            console.error("❌ [FRONTEND DEBUG] Error stack:", err.stack)
            setError(err.message || "Failed to generate challenge.")
        } finally {
            setIsLoading(false)
            console.log("🏁 [FRONTEND DEBUG] Generate challenge process completed")
        }
    }

    /**
     * Calculate the next quota reset time (24 hours from last reset)
     * Used to display when the user can generate more challenges
     * 
     * @returns {Date|null} Next reset time or null if no quota data
     */
    const getNextResetTime = () => {
        if (!quota?.last_reset_data) return null
        const resetDate = new Date(quota.last_reset_data)
        resetDate.setHours(resetDate.getHours() + 24)
        return resetDate
    }

    return <div className="challenge-container">
        <h2>Coding Challenge Generator</h2>

        {/* Quota display showing remaining challenges */}
        <div className="quota-display">
            <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
            {quota?.quota_remaining === 0 && (
                <p>Next reset: {getNextResetTime()?.toLocaleString()}</p>
            )}
        </div>
        
        {/* Difficulty selection dropdown */}
        <div className="difficulty-selector">
            <label htmlFor="difficulty">Select Difficulty</label>
            <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={isLoading}
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>

        {/* Generate challenge button */}
        <button
            onClick={generateChallenge}
            disabled={isLoading || quota?.quota_remaining === 0}
            className="generate-button"
        >
            {isLoading ? "Generating..." : "Generate Challenge"}
        </button>

        {/* Error message display */}
        {error && <div className="error-message">
            <p>{error}</p>
        </div>}

        {/* Render the generated challenge */}
        {challenge && <MCQChallenge challenge={challenge}/>}
    </div>
}