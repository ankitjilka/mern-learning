import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema)

export default Note