export const requestHandler = (fn, onError?) => async (req, res) => {
    try {
        console.info(`Pending request: ${req.method} ${req.originalUrl}`);
        await fn(req, res);
        console.info(`Success request: ${req.method} ${req.originalUrl}`);
    } catch (error) {
        console.error(`Error occurred in request: ${req.method} ${req.originalUrl}`, error);
        if (onError) {
            onError(req, res, error);
        } else {
            res.status(500).json('Internal Server Error');
        }
    }
};
