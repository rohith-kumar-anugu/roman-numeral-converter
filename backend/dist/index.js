"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const romanNumeralController_1 = require("./controllers/romanNumeralController");
const errorHandler_1 = require("./middleware/errorHandler");
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Initialize controller
const romanNumeralController = new romanNumeralController_1.RomanNumeralController();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/romannumeral', (req, res) => {
    romanNumeralController.convertToRoman(req, res);
});
// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Not Found');
});
// Global error handler
app.use(errorHandler_1.errorHandler);
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
