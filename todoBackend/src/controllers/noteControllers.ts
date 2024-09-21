import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";

interface NoteType {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface UpdateResponseType {
  message: string;
  updatedNotes?: NoteType[];
}

export default class NoteController {
  static async getHighestID(req: Request, res: Response): Promise<void> {
    try {
      // Construct the file path
      const filePath = path.join(__dirname, "../../../data/data.json");

      // Read the JSON file asynchronously
      const jsonData = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      // Parse the JSON data
      const idList = data.notes
        .map((note: NoteType) => note.id)
        .sort((a: number, b: number) => b - a);
      // Send the data as a response
      res.status(200).json(idList[0]);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      const noteId = parseInt(req.params.id);

      // Construct the file path
      const filePath = path.join(__dirname, "../../../data/data.json");

      // Read the JSON file
      const jsonData = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);

      // Find the note by ID and remove it
      const updatedNotes = data.notes.filter(
        (note: NoteType) => note.id !== noteId
      );
      if (updatedNotes.length === data.notes.length) {
        res.status(404).json({ message: "Invalid Note ID" });
      }
      data.notes = updatedNotes;

      // Write the updated JSON back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

      res.status(200).json({
        message: "Note deleted successfully",
        updatedNotes: data.notes,
      });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      console.error("Error deleting note:", error);
    }
  }
  static async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const noteId = parseInt(req.params.id);
      const { title, description, status } = req.body;
      // Construct the file path
      const filePath = path.join(__dirname, "../../../data/data.json");

      // Read the JSON file
      const jsonData = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      // Check if the note exists
      const searchedNote = data.notes.find(
        (note: NoteType) => note.id === noteId
      );
      if (!(searchedNote.id === noteId)) {
        res.status(404).send({ message: "Note not found" });
      } else if (!title && !description && !status) {
        res.status(500).send({
          params: { title: title, description: description, status: status },
          message: "Invalid Parameters",
        });
      }
      // Find the note by ID and remove it
      const updatedNotes = data.notes.map((note: NoteType) => {
        if (note.id === noteId) {
          note.title = title ?? note.title;
          note.description = description ?? note.description;
          note.status = status ?? note.status;
        }
        return note;
      });

      data.notes = updatedNotes;
      const updatedNote = updatedNotes.find(
        (note: NoteType) => note.id === noteId
      );

      // Write the updated JSON back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

      res.status(200).json({
        message: "Note updated successfully",
        updatedNotes: updatedNote,
      });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
      console.error("Error deleting note:", error);
    }
  }
  static async getNotes(req: Request, res: Response): Promise<void> {
    try {
      // Construct the file path
      const filePath = path.join(__dirname, "../../../data/data.json");

      // Read the JSON file asynchronously
      const jsonData = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      // Parse the JSON data

      // Send the data as a response
      res.status(200).json(data.notes);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async createNote(req: Request, res: Response): Promise<void> {
    try {
      // Construct the file path
      const filePath = path.join(__dirname, "../../../data/data.json");

      // Read the JSON file asynchronously
      const jsonData = await fs.readFile(filePath, "utf-8");
      // Parse the JSON data
      const data = JSON.parse(jsonData);
      const newData = req.body;
      // Modify the JSON object
      data.notes.push(newData); // Merge new data into the existing JSON

      // // Step 3: Write the updated JSON back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      // // Send the data as a response
      res.status(200).json(data.notes);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
}
