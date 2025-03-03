import { Request,Response } from 'express';
import  {prisma} from "@repo/db/client";


export const createSpriteAssets = async(req:Request,res:Response) => {
    try {
        const {path,frameWidth,frameHeight} = req.body;
        const response = await prisma.spriteAssets.create({
            data:{
                path,
                frameWidth,
                frameHeight
            }
        })
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
}

export const createSprite = async (req:Request,res:Response)=>{
    try {
        const {key,initialState} = req.body;
        const response = await prisma.sprites.create({
            data:{
                key,
                initialState
            }
        })
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
}

export const createAnimations = async (req:Request,res:Response) => {
    try {
        const {animations} = req.body;
        const response = await prisma.spriteAnimations.createMany({
            data:animations
        })
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
}

export const getAllSprites = async (req:Request,res:Response) => {
    try {
        const response = await prisma.sprites.findMany({
            include:{
                animations:true,
            }
        });
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
}

export const getAssets = async (req:Request,res:Response) => {
    try {
        const response = await prisma.spriteAssets.findMany({});
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
}