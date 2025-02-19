import { Request, Response } from "express";

function handleGetRequest(_req:Request, res:Response) {
    res.statusCode = 200;
    res.write('Hello there, I am so protected!');
    res.end()
}

export default {
    handleGetRequest
}