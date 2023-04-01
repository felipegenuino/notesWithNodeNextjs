import express from 'express'
const router = express.Router()

//Simulate database
let notes = [
    {id: 1, title: 'Note 1', content:'Content for note 1'},
    {id: 2, title: 'Note 2', content:'Content for note 2'},
    {id: 3, title: 'Note 3', content:'Content for note 3'},
]

// Get all notes
router.get('/', (req,res)=>{
    res.send(notes)
})

//Get a single note by id
router.get('/:id',(req, res)=>{
    const id = Number(req.params.id);
    const note = notes.find((note)=> note.id === id)

    if(!note){
        res.status(404).send({message: 'Note not found'})
    } else {
        res.send(note);
    }
})

// Create a new note
router.post('/', (req,res)=>{
    const {title, content} = req.body;
    const id = notes.length + 1;
    const newNote = {id, title, content}
    notes.push(newNote)
    res.status(201).send(newNote)
})

//Update a note by id
router.put('/:id', (req,res)=>{
    const id = Number(req.params.id)
    const {title, content} = req.body
    const noteIndex = notes.findIndex((note)=> note.id === id)

    if(noteIndex === -1){
        res.status(404).send({message : 'Note not found'});
    } else {
        notes[noteIndex] = {id, title, content}
        res.send(notes[noteindex])
    }
})

//delete a note by id
router.delete('/:id', (req, res)=>{
    const id = Number(req.params.id)
    notes = notes.filter((note)=>note.id !==id)
    res.send({message: 'Note deleted successfully'})
})

export default router;