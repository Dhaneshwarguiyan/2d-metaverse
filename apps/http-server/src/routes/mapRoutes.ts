import express, { Router } from "express";

const router:Router = express.Router();

//controllers import 
import { createMaps,createLayers,createAssets,createSpaces,deleteSpaces,getUserSpaces,checkSpace,getMap,getAllMaps } from "../controllers/mapControllers";
//create maps
router.post("/create",createMaps);

//create Layers
router.post("/layers", createLayers);

//create assets
router.post("/assets", createAssets);

//create new spaces
router.post("/spaces", createSpaces);

//delete owner space
//edge cases not handled....
router.post('/delete', deleteSpaces)

//get all user spaces
router.get("/spaces/all", getUserSpaces);

//check if the space is present or not
router.get("/space/get/:roomCode",checkSpace);

//to get the map based on the room
router.get("/space/:roomCode", getMap);

//Not yet implemented completely
router.get("/all", getAllMaps);

export default router;
