import express from "express";
import { createRequest, getAllRequests, updateRequestStatus } from "../controllers/requestController.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", getAllRequests);
router.put("/deliver", updateRequestStatus);

export default router;
