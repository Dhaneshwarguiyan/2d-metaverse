import { Request,Response } from "express";
import  { prisma } from "@repo/db/client";


export const createMaps =  async (req:Request,res:Response) => {
    try {
      const { name, tileSet } = req.body;
      const response = await prisma.maps.create({
        data: {
          name,
          tileSet,
        },
      });
      res.send(response);
    } catch (error: any) {
      if (error.code === "P2002") {
        const target = error.meta.target;
        res.status(400).send({ message: `${target} already exists` });
        return;
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  export const createLayers = async (req:Request,res:Response) => {
    try {
      const { layers } = req.body; //layers will contain the id of the map also
      const response = await prisma.mapLayers.createMany({
        data: layers,
        skipDuplicates: true,
      });
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  export const createAssets = async (req:Request,res:Response) => {
    try {
      const { assets } = req.body; //assets will contain the id of the map in mapId
      const response = await prisma.mapAssets.createMany({
        data: assets,
        skipDuplicates: true,
      });
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

export const createSpaces = async (req:Request,res:Response) => {
    try {
      const { roomCode,name, mapId } = req.body;
      const id = req.userId;
      const response = await prisma.rooms.create({
        data: {
          //it will be name and room will default to uuid
          name:name,
          roomCode:roomCode,
          mapId,
          userId: Number(id),
        },
      });
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

//delete messages also with the room incomplete
export const deleteSpaces = async(req:Request,res:Response)=>{
    try {
      //here room is the id of the room
      //changed to room(string i.e #s2jI5c.
      const { roomCode,roomId } = req.body;
      const id = req.userId;
      const visitedSpaces = prisma.visitedSpaces.deleteMany({
        where:{
            roomId:roomId
        }
      })
      const messages = prisma.messages.deleteMany({
        where:{
          roomCode:roomCode
        }
      })
      const rooms = prisma.rooms.delete({
        where:{
          id:roomId,
          userId:Number(id) //so that user is not able to delete others map
        }
      })
      const response = await prisma.$transaction([messages,visitedSpaces,rooms])
      res.send(response);
    } catch (error) {
      console.log(error);
    }
}

export const getUserSpaces = async (req:Request,res:Response) => {
    try {
      const userId = req.userId;
      const response = await prisma.rooms.findMany({
        where: {
          userId: Number(userId),
        },
        include:{
          user:true
        }
      });
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
}

export const checkSpace =  async (req:Request,res:Response) => {
    try {
      const roomCode = req.params.roomCode;
      const response = await prisma.rooms.findUnique({
        where: {
          roomCode: roomCode,
        },
      });
      if (response) {
        res.send({ message: true ,data: response});
        return;
      }
      res.send({ message: false ,data: []});
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

export const getMap = async (req:Request,res:Response) => {
    try {
      const { roomCode } = req.params;
      const response1 = await prisma.rooms.findUnique({
        where: {
          roomCode: roomCode,
        },
        select: {
          mapId: true,
        },
      });
      if (response1) {
        const response2 = await prisma.maps.findUnique({
          where: {
            id: response1.mapId,
          },
          include: {
            layers: true,
            assets: true,
          },
        });
        res.send(response2);
        return;
      }
      res.status(404).send({ message: "No room found" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  export const getAllMaps = async (req:Request,res:Response) => {
    try {
      const response = await prisma.maps.findMany({});
      res.status(200).send(response);
    } catch (error) {
      res.send({ message: "Internal Server Error" });
    }
  }