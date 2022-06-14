import React, {useState} from 'react';
import s from "./Note.module.scss"
import {TagType} from "./Notes";
import comm from "../commonstyle/Botton.module.scss"
import {EditNote} from "./EditNote";
import {TagList} from "../TagsList/TagList";
import { Marker } from "react-mark.js";
import {findTags} from "../../../utils/findTags";

export type NoteType = {
    not_id: number
    editNote: (not_id: number, description: string, tags: TagType[]) => void
    deleteNote: (id: number) => void
    addTag: (not_id: number, tag: string) => void
    deleteTag: (not_id: number, id: number) => void
    tagList: TagType[]
    description: string

}

export const Note = (props: NoteType) => {
    // console.log(findTags(props.description))
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const tempTags:any = findTags(props.description)

    return (
        <div className={s.noteOuterWrapper}>
            {!isEdit && <div className={s.noteInnerWrapper}>
                <div className={s.note}>
                    <div className={s.noteBody}>

                        <div className={s.noteDescription}>
                            <Marker mark={tempTags} >{props.description}</Marker>
                          {/*{props.description}*/}
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
            {isEdit && <EditNote
                cancel={setIsEdit}
                not_id={props.not_id}
                description={props.description}
                edit={props.editNote}
                tagList={props.tagList}
                addTag={props.addTag}
            />
            }

            <TagList
                tags={props.tagList}
                addTag={props.addTag}
                noteId={props.not_id}
                deleteTag={props.deleteTag}
            />

        </div>
    );
};

