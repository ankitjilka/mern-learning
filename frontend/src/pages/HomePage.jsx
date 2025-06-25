import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios"
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import NoteDetailPage from "./NoteDetailPage";
import { useLocation } from "react-router-dom";

import { useRef } from "react";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)
  const location = useLocation();
  const hasAppendedRef = useRef(false);
  
  useEffect(() => {
    const fetchNotes = async () => {
      console.log("Fetching all notes from server...");
      console.log("👀 Location state:", location.state);

      try {
        const res = await api.get("/notes");
        let allNotes = res.data;
      // Check for newNote in location.state
        if (location.state?.newNote) {
        console.log("Merging new note with server data...");
        const isAlreadyIncluded = allNotes.some(
          note => note._id === location.state.newNote._id
        );
        if (!isAlreadyIncluded) {
          allNotes = [...allNotes, location.state.newNote];
        }
        // Clear the state after using
        window.history.replaceState({}, document.title);
      }
      if (location.state?.deletedNoteId) {
        allNotes = allNotes.filter(n => n._id !== location.state.deletedNoteId);
        window.history.replaceState({}, document.title);
      }

      setNotes(allNotes);
      setIsRateLimited(false);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
    };
  
    fetchNotes();
  }, [location.state]);
  

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage