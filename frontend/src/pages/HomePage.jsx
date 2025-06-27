import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios"
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import NoteDetailPage from "./NoteDetailPage";
import { useLocation } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import { useRef } from "react";


const HomePage = () => {
  const { notes, loading, isRateLimited } = useNotes();

  // const [isRateLimited, setIsRateLimited] = useState(false);
  // const [notes,setNotes] = useState([])
  // const [loading,setLoading] = useState(true)
//   const location = useLocation();
//   const hasAppendedRef = useRef(false);
  
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const res = await api.get("/notes");
//         console.log("load all notes")
//         setNotes(res.data);
//         setIsRateLimited(false);
//       } catch (err) {
//         toast.error("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotes();
//   }, []); // <== Only run once on mount

// useEffect(() => {
//   if (location.state?.newNote) {
//     setNotes(prev => [...prev, location.state.newNote]);
//     console.log("new note creating..")
//     window.history.replaceState({}, document.title); // clear state
//   }

//   if (location.state?.updatedNote) {
//     console.log("updating notes..")
//     setNotes(prev =>
//       prev.map(note => note._id === location.state.updatedNote._id ? location.state.updatedNote : note)
//     );
//     window.history.replaceState({}, document.title);
//   }

//   if (location.state?.deletedNoteId) {
//     console.log("deleting notes..")
//     setNotes(prev => prev.filter(note => note._id !== location.state.deletedNoteId));
//     window.history.replaceState({}, document.title);
//   }
// }, [location.state]);

   return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage