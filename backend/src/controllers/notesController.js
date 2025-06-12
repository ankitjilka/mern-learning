export const getAllNotes = (req,res) => {
    res.status(200).send("you just fetched 5 notes");
}

export function createNotes(req,res) {
    res.status(201).json({message: "notes created"});
}

export const updateNotes = (req,res) => {
    res.status(200).json({message: "Notes updated..."});
}

export function deleteNotes(req,res) {
    res.status(200).json({message: "notes deleted"});
}