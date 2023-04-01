import express from 'express';
import cors from 'cors'
import notesRouter from './routes/notes.js'

const app = express(); 
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors());

app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});