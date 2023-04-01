import { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import api from '../../../lib/api'
import Link from "next/link";

type Note = {
    id: number;
    title: string;
    content: string;
}

export default function NotePage(){
    const router = useRouter();
    const [note, setNote] = useState<Note>();

    useEffect(()=>{
        async function fetchNote(){
            try{
                const {id} = router.query;
                const response = await api.get(`/notes/${id}`);
                setNote(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchNote()
    },[router])

    return(
        <> 
        {note? (
        <>
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
            <Link href={`/notes/${note?.id}/edit`}>Edit</Link>
        </>
        ) : (
        <p>Loading...</p>
        )}
        </>
    )


}