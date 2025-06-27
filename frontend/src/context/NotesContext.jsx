import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Only runs once
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (err) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Methods to update notes locally
  const addNote = (newNote) => {
    setNotes(prev => [...prev, newNote]);
  };

  const updateNote = (updatedNote) => {
    setNotes(prev =>
      prev.map(n => (n._id === updatedNote._id ? updatedNote : n))
    );
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n._id !== id));
  };

  return (
    <NotesContext.Provider value={{
      notes,
      loading,
      isRateLimited,
      addNote,
      updateNote,
      deleteNote,
    }}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook
export const useNotes = () => useContext(NotesContext);
