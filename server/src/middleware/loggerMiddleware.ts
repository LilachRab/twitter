import { NextFunction, Request, Response } from 'express';

export const logger = async (req: Request, _res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();

    console.log(`
        request logger
        time:\t ${timestamp}
        method:\t ${req.method}
        host:\t ${req.hostname} 
        url:\t ${req.url} 
        ip:\t ${req.ip}\n`);
    next();
};
