import express, { Router } from "express";

const router:Router = express.Router();



//controllers import
import { setMessage,getMessages,setAsRead,deleteAllMessages} from "../controllers/messageController";
//Set messages
router.post("/",setMessage);

router.post("/room",getMessages);

router.get('/read',setAsRead);


router.delete('/delete',deleteAllMessages);

export default router;
