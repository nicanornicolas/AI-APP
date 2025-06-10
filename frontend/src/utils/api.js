/**
 * API Utility Hook
 * 
 * This custom hook provides a standardized way to make authenticated API requests
 * to the backend. It handles authentication tokens, request configuration,
 * and error handling automatically.
 * 
 * Features:
 * - Automatic authentication token injection
 * - Standardized error handling
 * - Quota exceeded detection
 * - JSON response parsing
 * - Default headers configuration
 */

import {useAuth} from "@clerk/clerk-react"

/**
 * useApi Hook
 * 
 * Custom hook that provides an authenticated API request function.
 * Uses Clerk's authentication to automatically include auth tokens.
 * 
 * @returns {Object} Object containing makeRequest function
 */
export const useApi = () => {
    // Get authentication token function from Clerk
    const {getToken} = useAuth()

    /**
     * Make an authenticated API request to the backend
     * 
     * Automatically includes authentication headers and handles common
     * error scenarios like quota exceeded and validation errors.
     * 
     * @param {string} endpoint - API endpoint path (relative to /api/)
     * @param {Object} [options={}] - Fetch options to merge with defaults
     * @param {string} [options.method='GET'] - HTTP method
     * @param {string} [options.body] - Request body (usually JSON string)
     * @param {Object} [options.headers] - Additional headers to include
     * @returns {Promise<Object>} Parsed JSON response from the API
     * @throws {Error} Throws error with appropriate message for different failure cases
     */
    const makeRequest = async (endpoint, options = {}) => {
        const requestId = Math.random().toString(36).substr(2, 9);
        console.log(`🌐 [API DEBUG ${requestId}] Starting request to: ${endpoint}`)
        console.log(`🌐 [API DEBUG ${requestId}] Request options:`, options)
        
        // Get current authentication token from Clerk
        const token = await getToken()
        console.log(`🔑 [API DEBUG ${requestId}] Auth token obtained:`, token ? `${token.substr(0, 20)}...` : 'No token')
        
        // Default request configuration
        const defaultOptions = {
            headers: {
                "Content-Type": "application/json",  // Expect/send JSON data
                "Authorization": `Bearer ${token}`  // Include auth token
            }
        }

        const finalOptions = {
            ...defaultOptions,  // Apply defaults first
            ...options,  // Override with custom options
        }
        
        const fullUrl = `http://localhost:8000/api/${endpoint}`;
        console.log(`🌐 [API DEBUG ${requestId}] Full URL: ${fullUrl}`)
        console.log(`🌐 [API DEBUG ${requestId}] Final options:`, finalOptions)

        try {
            // Make the HTTP request with merged options
            const response = await fetch(fullUrl, finalOptions)
            
            console.log(`📡 [API DEBUG ${requestId}] Response received:`)
            console.log(`📡 [API DEBUG ${requestId}] Status: ${response.status} ${response.statusText}`)
            console.log(`📡 [API DEBUG ${requestId}] Headers:`, Object.fromEntries(response.headers.entries()))

            // Handle non-successful responses
            if (!response.ok) {
                console.error(`❌ [API DEBUG ${requestId}] Non-successful response: ${response.status}`)
                
                // Try to parse error details from response
                const errorData = await response.json().catch(() => null)
                console.error(`❌ [API DEBUG ${requestId}] Error data:`, errorData)
                
                // Handle specific error cases
                if (response.status === 429) {
                    throw new Error("Daily quota exceeded")
                }
                
                // Throw error with server message or generic fallback
                throw new Error(errorData?.detail || "An error occurred")
            }

            // Parse and return successful response
            const responseData = await response.json()
            console.log(`✅ [API DEBUG ${requestId}] Successful response:`, responseData)
            console.log(`✅ [API DEBUG ${requestId}] Response type:`, typeof responseData)
            
            return responseData
            
        } catch (error) {
            console.error(`❌ [API DEBUG ${requestId}] Request failed:`, error)
            console.error(`❌ [API DEBUG ${requestId}] Error type:`, error.name)
            console.error(`❌ [API DEBUG ${requestId}] Error message:`, error.message)
            throw error
        }
    }

    // Return the makeRequest function for use in components
    return {makeRequest}
}