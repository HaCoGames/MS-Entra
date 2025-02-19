import { Request, Response, NextFunction } from 'express';

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== "Bearer my-secret-token") {
        res
            .status(401)
            .json({ error: "Unauthorized" });
        return;
    }

    next();
}

export default {
    authMiddleware}
;
