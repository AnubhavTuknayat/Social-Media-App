import express from "express";
import {getFeed,getUserPosts,likePost} from "../controllers/posts.js"
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();

// READ:
router.get("/",verifyToken,getFeed);
router.get("/:userId",verifyToken,getUserPosts);

// UPDATE:
router.patch("/:id/like",verifyToken,likePost)

export default router;