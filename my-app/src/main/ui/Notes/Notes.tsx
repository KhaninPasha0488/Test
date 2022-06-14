import {useEffect, useMemo, useState} from "react";
import {findTags} from "../../../utils/findTags";
import s from "./Notes.module.scss"
import {Note} from "./Note";
import comm from "../commonstyle/Botton.module.scss";
import comtext from "../commonstyle/TexyArea.module.scss"
import cominp from "../commonstyle/Input.module.scss"
import {createId} from "../../../utils/createId";


export type TagType = {
    id: number
    body: string
}
export type NotesType = {
    not_id: number
    description: string
    tags: TagType[]
}
export type NotesPropsType = {
    notes: Array<NotesType>

}


export const Notes = (props: NotesPropsType) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNotice, setNewNotice] = useState('')
    const [query, setQuery] = useState('#')


    const searchNotes = useMemo(() => {
        let searchArray = notes
        const tags = findTags(query)
        if (tags) {
            let tagsQr = tags.sort().join('')
            searchArray = notes.filter(note => {
                let noteQr = note.tags.map(tag => tag.body).sort().join('')
                return noteQr.includes(tagsQr)
            })
        }
        return searchArray
    }, [query, notes])

    const deleteNote = (not_id: number) => {
        setNotes(notes.filter(note => note.not_id !== not_id))

    }
    const addNote = (notes: Array<NotesType>) => {
        const tagsBodies = findTags(newNotice)
        let tagArrayObjects: any = []
        if (tagsBodies) {
            tagArrayObjects = tagsBodies.map(tag => ({id: createId, body: tag}))
        }
        const note = {not_id: createId(), description: newNotice, tags: tagArrayObjects}
        setNotes([note, ...notes])
        setNewNotice('')

    }
    const editNote = (not_id: number, description: string, tags: any) => {
        console.log(description)
        if (Array.isArray(tags)) {
            setNotes(notes.map(note => {
                return not_id !== note.not_id ? note : {
                    not_id,
                    description,
                    tags: [...note.tags.map(tag => ({id: createId(), body: tag.body}))]
                    //tags: [...note.tags.map(tag => ({id: createId(), body:tag.body}))],

                }
            }))
            // setTimeout(() => addTag(not_id,tags[tags.length-1]), 1000);

            //addTag(not_id,tags[tags.length-1])
        }

        // } else {
        //    setNotes(notes.map(note => {
        //        return not_id !== note.not_id ? note : {not_id, description, tags: [...note.tags]}
        //
        //    }))


    }
    const addTag = (not_id: number, tag:any) => {
        console.log(not_id, tag)
        //

        //     // @ts-ignore
        //     setNotes(notes.map(note => {
        //         return not_id !== note.not_id ? note : {...note,
        //             tags: [...note.tags, tag.map(item => ({id: createId, body: item}))]
        //         }
        //     }))
        //

            setNotes(notes.map(note => {
                return not_id !== note.not_id ? note : {...note, tags: [...note.tags, {id: createId(), body: tag}]}

            }))

        }

        // setNotes(notes.map(note => {
        //     return not_id !== note.not_id ? note : {
        //         not_id,description,
        //         description,
        //         tags: [...note.tags.map(tag => ({id: createId(), body: tag.body}))]


        const deleteTag = (not_id: number, id: number) => {
            setNotes(notes.map(note => {
                return not_id !== note.not_id ? note : {...note, tags: [...note.tags.filter(tag => id !== tag.id)]}
                //return id !== note.id ? note : {...note, tags: [...note.tags.filter(tag => tagId !== tag.id)]}
            }))
        }
        return (
            <div className={s.notes}>
                <div className={s.newNoteAndTag}>
                    <div className={s.newNote}>
                <textarea className={comtext.textarea}
                          placeholder="new note"
                          onChange={(e) => setNewNotice(e.target.value)}
                          value={newNotice}/>
                        <button className={comm.button}
                                onClick={() => addNote(notes)}>Create note
                        </button>
                    </div>
                    <hr/>
                    <div className={s.filter}>
                        <input className={cominp.input}
                               placeholder="search by #tags"
                               onChange={(e) => setQuery(e.target.value)}
                               value={query}/>
                    </div>
                </div>
                {searchNotes.map(note =>
                    <Note

                        key={note.not_id}
                        not_id={note.not_id}
                        tagList={note.tags}
                        editNote={editNote}
                        deleteNote={deleteNote}
                        addTag={addTag}
                        deleteTag={deleteTag}
                        description={note.description}

                    />
                )}
            </div>
        );
    };
