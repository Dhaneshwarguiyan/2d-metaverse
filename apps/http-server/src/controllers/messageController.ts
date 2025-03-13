import { Request,Response } from "express";
import  {prisma} from "@repo/db/client";

export const setMessage = async (req:Request, res:Response) => {
    const id = req.userId;
    const { message, room, sender } = req.body;
    try {
      const response = await prisma.messages.create({
        data: {
          sender: sender,
          message: message,
          room: Number(room),
          userId: Number(id),
        },
      });
      res.status(200).send({ message: "Message Sent successfully",response:response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

export const getMessages = async (req:Request, res:Response) => {
    //this message will only be fetched first time the chat component got rendered
    const { room } = req.body;
    try {
      const message = await prisma.messages.findMany({
        where: {
          room: Number(room),
        },
      });
      if (message) {
        res.status(200).send(message);
        return;
      }
      res.status(200).send({});
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

export const deleteAllMessages = async (req:Request,res:Response) => {
  try {
    await prisma.messages.deleteMany({});
    res.send({message:"Successfully deleted all messages"});
  } catch (error) {
    res.status(500).send({message:"Internal server error"});
  }
}