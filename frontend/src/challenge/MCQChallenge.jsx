/**
 * Multiple Choice Question Challenge Component
 * 
 * This component renders an interactive coding challenge with multiple choice options.
 * Users can select an answer and see immediate feedback with explanations.
 * 
 * Features:
 * - Interactive option selection
 * - Visual feedback for correct/incorrect answers
 * - Conditional explanation display
 * - Handles both string and array option formats
 * - Single-selection enforcement
 */

import "react"
import {useState} from "react"

/**
 * MCQChallenge Component
 * 
 * Renders a multiple choice coding challenge with interactive options
 * and optional explanation display.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.challenge - Challenge data object
 * @param {string} props.challenge.title - The challenge question
 * @param {string|Array} props.challenge.options - Answer options (JSON string or array)
 * @param {number} props.challenge.correct_answer_id - Index of correct answer (0-3)
 * @param {string} props.challenge.explanation - Detailed explanation of correct answer
 * @param {string} props.challenge.difficulty - Challenge difficulty level
 * @param {boolean} [props.showExplanation=false] - Whether to show explanation immediately
 * @returns {JSX.Element} Interactive MCQ challenge component
 */
export function MCQChallenge({challenge, showExplanation = false}) {
    // State management for user interaction
    const [selectedOption, setSelectedOption] = useState(null)  // Currently selected option index
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)  // Show explanation flag

    // Parse options from string or use array directly
    // This handles different data formats from API/database
    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)  // Parse JSON string from database
        : challenge.options  // Use array directly

    /**
     * Handle option selection by user
     * Prevents multiple selections and triggers explanation display
     * 
     * @param {number} index - Index of selected option
     */
    const handleOptionSelect = (index) => {
        // Prevent reselection once an option is chosen
        if (selectedOption !== null) return;
        
        setSelectedOption(index)
        setShouldShowExplanation(true)  // Show explanation after selection
    }

    /**
     * Get appropriate CSS class for option styling
     * Provides visual feedback for correct/incorrect answers
     * 
     * @param {number} index - Option index to get class for
     * @returns {string} CSS class name for the option
     */
    const getOptionClass = (index) => {
        // No selection made yet - default styling
        if (selectedOption === null) return "option"

        // Correct answer - always highlighted in green
        if (index === challenge.correct_answer_id) {
            return "option correct"
        }
        
        // User's incorrect selection - highlighted in red
        if (selectedOption === index && index !== challenge.correct_answer_id) {
            return "option incorrect"
        }

        // Other options - default styling
        return "option"
    }

    return (
        <div className="challenge-display">
            {/* Challenge metadata */}
            <p><strong>Difficulty</strong>: {challenge.difficulty}</p>
            
            {/* Challenge question */}
            <p className="challenge-title">{challenge.title}</p>
            
            {/* Multiple choice options */}
            <div className="options">
                {options.map((option, index) => (
                    <div
                        className={getOptionClass(index)}
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        style={{ cursor: selectedOption === null ? 'pointer' : 'default' }}
                    >
                        {option}
                    </div>
                ))}
            </div>
            
            {/* Conditional explanation display */}
            {shouldShowExplanation && selectedOption !== null && (
                <div className="explanation">
                    <h4>Explanation</h4>
                    <p>{challenge.explanation}</p>
                </div>
            )}
        </div>
    )
}