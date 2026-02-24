const handleError = (res, error, context) => {
    console.error(`Error ${context}:`, error);
    const statusCode = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'Internal Server Error';
    res.status(statusCode).json({ error: message });
};

export default handleError;
