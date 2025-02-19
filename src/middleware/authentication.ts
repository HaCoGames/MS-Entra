import { Request, Response, NextFunction } from 'express';

import jsonwebtoken from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const tenantId = process.env.TENANT_ID;
const clientId = process.env.TENANT_ID;
const jwksUri = `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`;

const client = jwksClient(
    {
        jwksUri
    }
);

function getKey(header: any, callback:any) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err, null);
            return;
        }

        const signingKey = key?.getPublicKey() || '';
        callback(null, signingKey);
    });
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== "Bearer my-secret-token") {
        res.statusCode = 401;
        res.json({ error: "Unauthorized: No token provided" });
        return;
    }

    const token = authHeader.split(' ')[1];

    jsonwebtoken.verify(token, getKey, {
            audience: clientId,
            issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
            algorithms: ['RS256'],
        },
        verifyResponse
    );

    function verifyResponse(err:any, decoded: any) {
        if (err) {
            res.statusCode = 401;
            res.json({ error: 'Unauthorized: Invalid token' });
        }

        next()
    }
}

export default {
    authMiddleware}
;
