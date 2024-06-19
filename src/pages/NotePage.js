import { React, useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/352467_arrow_left_icon.svg'

const NotePage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [id])

    let getNote = async () => {
        if (id==='new') return;
        let response = await fetch(`http://localhost:3000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async () => {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    let createNote = async () => {
        await fetch(`http://localhost:3000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    
    let deleteNote = async () => {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if (id !== 'new' && !note.body) {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null){
            createNote()
        }
        navigate('/')
    }
    
    return (
        <div className='note'>
            <div className='notes-header'>
                <h3 className=''>
                    <Link to='/' >
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {id!=='new'?(
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => {
                setNote({
                    ...note,
                    'body': e.target.value
                });
            }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
