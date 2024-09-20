import { Router } from "express";
import NoteController from "../controllers/noteControllers";

const router = Router();

router.get("/", NoteController.getNotes);
router.get("/getMaxId", NoteController.getHighestID);
router.post("/create", NoteController.createNote);
router.delete("/delete/:id", NoteController.deleteNote);
router.put("/update/:id", NoteController.updateNote);

export default router;
