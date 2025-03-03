import { Request,Response } from "express";
import  {prisma} from "@repo/db/client";

export const postFeedbackController = async (req:Request,res:Response) => {
    try {
        const {feedback} = req.body;
        await prisma.feedbacks.create({
            data:{
                feedback
            }
        })
        res.send({message:"Thanks for the feedback"})
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
}

export const getFeedbackController = async (req:Request,res:Response) => {
    try {
        const response = await prisma.feedbacks.findMany({});
        res.send(response);
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
}