import { getDB,insertDB,saveDB } from "./db.js";

export const newNote = async (note,tag) =>{
    const newNote = {
        tag,
        id: Date.now(),
        
        content:note
    }
    await insertDB(newNote)
    return newNote

}
export const getAllNotes = async () =>{
    const db = await getDB()
    return db.notes
}
export const findNotes = async (filter) => {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};
export const deleteNote = async (id) =>{
    const notes = await getAllNotes()
    const match = notes.find(note => note.id === id)
    if (match){
        const newNote = notes.filter(note => note.id !== id)
        await saveDB({notes: newNote}) 
        return id
    }

}
export const deleteAll = async () =>{
    await saveDB({notes:[]})
}