import {useState} from "react"
import api from '../lib/api'

type NewNote = {
    title: string;
    content: string;
};

export default function NewNote(){
    const [note, setNote] = useState<NewNote>({
        title: "",
        content: "",
    });

    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try{
            await api.post('/notes', note);
            alert('Note created successfully!');
            setNote({title:"", content:""})
        } catch (error){
            console.log(error);
            alert("error creating note")
        }
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.target;
        setNote({...note, [name]:value});
    }

return(
    <div>
        <h1>New Note</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleInputChange}
                 />
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea 
                   id="" 
                   name="content" 
                   value={note.content}
                   onChange={handleInputChange}
                />
            </div>
            <button type="submit">Create note</button>
        </form>
    </div>
)

  
}