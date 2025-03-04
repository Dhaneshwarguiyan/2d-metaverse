import express, { Router } from "express";

const router:Router = express.Router();



//controllers import
import { setMessage,getMessages,deleteAllMessages} from "../controllers/messageController";
//Set messages
router.post("/",setMessage);

router.get("/room",getMessages);

router.delete('/delete',deleteAllMessages);

export default router;
