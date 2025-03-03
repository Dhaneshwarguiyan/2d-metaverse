import express, { Router } from 'express';

const router:Router = express.Router();


//controllers import 
import { createSpriteAssets,createSprite,createAnimations,getAllSprites,getAssets } from '../controllers/spriteControllers';

//creating sprite assets
router.post('/create/assets',createSpriteAssets)

//creating sprites
router.post('/create/sprite',createSprite)

//creating animations
router.post('/create/animations',createAnimations)

//getting all sprites
router.get('/get/sprites',getAllSprites)

//getting all assets
router.get('/get/assets',getAssets)

export default router;