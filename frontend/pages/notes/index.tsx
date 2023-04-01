import Link from 'next/link';
import {useState, useEffect} from 'react'
import api from '../../lib/api'

type Note = {
    id: number;
    title: string;
    content: string;
};

export default function Notes(){
    const [notes, setNotes] = useState<Note[]>([])

    useEffect(()=>{
        async function fetchNotes(){
            const response = await api.get('/notes');
            setNotes(response.data)
        }
        fetchNotes()
    }, [])

    return(
        <div>
            <h1>Notes</h1>

            <ul>
                {notes.map((note)=>(
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <Link href={`/notes/${note.id}/edit`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}