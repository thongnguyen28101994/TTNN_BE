import { NextFunction, Request, Response } from "express"

export interface AppErr extends Error {
    status?:number
}

export const errorHandlers = (err:AppErr,req:Request,res:Response,next:NextFunction) =>{
    console.log(err.message);
    res.status(err.status||500).json({
        status:err.status||500,
        message:  'Internal Server Error',
    })
}