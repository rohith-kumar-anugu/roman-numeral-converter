"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
    console.error(`Error: ${err.message}`);
    res.status(500).send('Internal Server Error');
}
