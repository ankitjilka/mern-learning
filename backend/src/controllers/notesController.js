import { title } from "process";
import Note from "../models/Note.js";

export async function getAllNotes(_,res) {
  try{  
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes::",error);
    res.status(500).json({ message: "Internal server error"})
  }  
}

export async function findNote(req,res) {
    try {
        const findedNote = await Note.findById(req.params.id);
        if(!findedNote) return res.status(404).json({ message: "note not found"});
        res.status(200).json(findedNote);
    } catch (error) {
       console.error("error in findNotes::",error);
       res.status(500).json({ message: "Internal server error"}) 
    }
}

export async function createNotes(req,res) {
   try {
     const {title,content} = req.body
     const note = new Note({title, content})
     const savedNote = await note.save();
     res.status(201).json(savedNote)
   } catch (error) {
       console.error("error in createNotes::",error);
       res.status(500).json({ message: "Internal server error"}) 
   }
}

export async function updateNotes (req,res) {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,});
        if(!updatedNote) return res.status(404).json({message: "Note not found"})
        // res.status(200).json({ message: "Note updated successfully"})
        res.status(200).json(updatedNote);
    } catch (error) {
       console.error("error in updateNotes::",error);
       res.status(500).json({ message: "Internal server error"}) 
    }
}

export async function deleteNotes(req,res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({ message: "Note deleted successfully"});
    } catch (error) {
        console.error("error in deleteNotes::",error);
        res.status(500).json({ message: "Internal server error"})   
    }
}