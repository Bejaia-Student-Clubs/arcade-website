import { Request, Response, NextFunction } from "express";

//checks if the zod accepts the inputs (go to authValidators.ts)
export const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // try to validate the request body against the schema
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // gather all the error messages into one readable string
            const error = result.error.issues.map((err: any) => err.message).join(", ");

            return res.status(400).json({ message: error });
        }

        // replace req.body with the validated data from zod
        req.body = result.data;

        // everything is valid, move on to the next function (the controller)
        next();

    }

}