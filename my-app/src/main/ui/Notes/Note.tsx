import React, {useState} from 'react';
import s from "./Note.module.scss"
import {NotesType, TagType} from "./Notes";
import comm from "../commonstyle/Botton.module.scss"


export type NoteType = {
    // notes:Array<NotesType>
    not_id: number
    editNote: () => void
    deleteNote: (id: number) => void
    addTag: () => void
    deleteTag: () => void
    tagList: TagType[]
    description: string
}

export const Note = (props: NoteType) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    return (
        <div className={s.noteOuterWrapper}>
            {!isEdit && <div className={s.noteInnerWrapper}>
                <div className={s.note}>
                    <div className={s.noteBody}>

                        <div className={s.noteDescription}>
                            {props.description}
                        </div>
                    </div>
                </div>
                <div className={s.noteButtons}>
                    <div className={s.btnDefault}>
                        <button className={comm.button}
                                onClick={() => {
                                    setIsEdit(true)
                                }}>Edit
                        </button>
                        <button className={comm.button}
                                onClick={() => {
                                    props.deleteNote(props.not_id)
                                }}>Delete
                        </button>
                    </div>
                </div>
            </div>
            }
            {/*{isEdit && <EditNote*/}
            {/*    cancel={setIsEdit}*/}
            {/*    id={props.id}*/}
            {/*    description={props.description}*/}
            {/*    edit={props.editNote}*/}
            {/*    tagList={props.tagList}*/}
            {/*    addTag={props.addTag}*/}
            {/*/>*/}
            {/*}*/}
            <hr/>
            {/*<TagList tags={tagList} addTag={addTag} noteId={id} deleteTag={deleteTag}/>*/}
        </div>
    );
};

