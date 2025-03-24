"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RomanNumeralController = void 0;
const romanNumeralService_1 = require("../services/romanNumeralService");
// Initialize the service
const romanNumeralService = new romanNumeralService_1.RomanNumeralService();
class RomanNumeralController {
    /**
     * Handles the conversion request and sends a JSON response
     * @param req - Express request object
     * @param res - Express response object
     */
    convertToRoman(req, res) {
        try {
            // Get the query parameter
            const queryParam = req.query.query;
            // Validate that the query parameter exists
            if (!queryParam) {
                res.status(400).send('Missing required parameter: query');
                return;
            }
            // Convert the query parameter to a number
            const num = Number(queryParam);
            // Convert to Roman numeral using the service
            const romanNumeral = romanNumeralService.convertToRoman(num);
            // Send JSON response
            res.json({
                input: queryParam.toString(),
                output: romanNumeral
            });
        }
        catch (error) {
            // Handle errors
            if (error instanceof Error) {
                res.status(400).send(error.message);
            }
            else {
                res.status(500).send('An unexpected error occurred');
            }
        }
    }
}
exports.RomanNumeralController = RomanNumeralController;
