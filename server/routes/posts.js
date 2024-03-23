import express from "express";
import {getFeed,getUserPosts} from "../controllers/posts.js"
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();

// READ:
router.get("/",verifyToken,getFeed);
router.get("/:userId/posts",verifyToken,getUserPosts);

// UPDATE:
// router.patch("/:id/like",verifyToken.likePost)

export default router;