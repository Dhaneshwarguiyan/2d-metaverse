import express, {Router} from 'express';
import { prisma } from '@repo/db/client';

const router:Router = express.Router();

//update the recently visited space
//transaction inconsistency
router.get('/visitSpace/:spaceId',async (req,res)=>{
    const {spaceId} = req.params;
    const userId = req.userId;
    try {
        const myVisitedSpaces = await prisma.visitedSpaces.findMany({
            where:{
                userId:Number(userId),
                roomId:Number(spaceId)
            },
        })
        let recentlyVisitedSpace;
        //creating a new recently visited
        if(myVisitedSpaces.length === 0){
            recentlyVisitedSpace = await prisma.visitedSpaces.create({
                data:{
                    userId:Number(userId),
                    roomId:Number(spaceId)
                }
            })
        }
        //updating the old recently visited
        if(myVisitedSpaces[0] && myVisitedSpaces[0].id)
        {
            const id = myVisitedSpaces[0]?.id;
            recentlyVisitedSpace = await prisma.visitedSpaces.update({
                where:{
                    id:id
                },
                data:{
                    userId:Number(userId),
                    roomId:Number(spaceId)
                }
            })
        }
        res.send(recentlyVisitedSpace);
    } catch (error) {
        console.log(error);
        res.status(404).send({message:"Internal error"})
    }
})

router.get('/removeSpace/:id',async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const removedVisited = await prisma.visitedSpaces.delete({
            where:{
                id:Number(id)
            }
        })
        res.send(removedVisited);
    } catch (error) {
        console.log(error);
        res.status(404).send({message:"Internal server error"});
    }
})

router.get('/all',async (req,res) => {
    const userId = req.userId;
    try {
        const response = await prisma.visitedSpaces.findMany({
            where:{
                userId:Number(userId)
            },
            include:{
                room:true
            }
        })
        res.send(response);
    } catch (error) {
        res.status(404).send({message:"Internal server error"})
    }
})

export default router;