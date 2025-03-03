import express, { Router } from "express";

const router:Router = express.Router();

import { postFeedbackController,getFeedbackController } from "../controllers/feedbackControllers";

router.post('/',postFeedbackController);
router.get('/',getFeedbackController);

export default router;