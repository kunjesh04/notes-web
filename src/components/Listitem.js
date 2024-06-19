import React from 'react'
import { Link } from 'react-router-dom'

const getTitle = (note) => {
    const title = note.body.split('\n')[0]
    if (title.length > 45) { return title.slice(0, 45) }
    return title
}

const getDate = (note) => {
    return new Date(note.updated).toLocaleString('en-GB')
}

const getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if (content.length > 45) { return content.slice(0, 25) }
    return content
}

const Listitem = ({ note }) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className='notes-list-item'>
                <h3>{getTitle(note)}</h3>
                <p><span>{getDate(note)}</span> {getContent(note)} </p>
            </div>
        </Link>
    )
}

export default Listitem
