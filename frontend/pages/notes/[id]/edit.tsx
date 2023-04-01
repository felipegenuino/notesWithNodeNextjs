import { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import api from '../../../lib/api'

type Note = {
    id: number;
    title: string;
    content: string;
}

export default function EditNote(){
    const router = useRouter();
    const [note, setNote] = useState<Note>({
        id:0,
        title: '',
        content:'',
    })

    useEffect(()=>{
        async function fetchNote(){
            const {id} = router.query;
            const response = await api.get(`/notes/${id}`)
            setNote(response.data)
        }
        fetchNote();
    },[router.query])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const {id} = note;
        await api.put(`/notes/${id}`, note)
        router.push('/notes')
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <input 
                    id="title"
                    type="text"
                    value={note.title}
                    onChange={(event)=> setNote({...note, title:event.target.value})
                    } />
                </label>
                <label htmlFor="content">
                    <textarea 
                        value={note.content}
                        onChange={(event)=>{
                            setNote({...note, content:event.target.value})
                        }}
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}