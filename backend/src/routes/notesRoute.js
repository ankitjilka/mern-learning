import express from "express";
import { getAllNotes, createNotes, updateNotes, deleteNotes, findNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", findNote);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes)

export default router;