import React, {ChangeEvent, useState} from 'react';
import {TagType} from "./Notes";
import s from "./EditNote.module.scss"
import ids from "../commonstyle/Botton.module.scss"
import idst from "../commonstyle/TexyArea.module.scss"
import {findTags} from "../../../utils/findTags";

export type EditNoteType = {
    not_id: number
    edit: (not_id: number, description: string, tags: TagType[]) => void
    addTag: (not_id: number, tag: string) => void
    tagList: TagType[]
    description: string
    cancel: (boolean: boolean) => void
}

export const EditNote = (props: EditNoteType) => {

    const [text, setText] = useState(props.description)

    const editDescription = () => {
        const tempTags: any = findTags(text)
        let noRepeatArray: any = []
        if (tempTags) {
            props.tagList.forEach(({body}) => {
                noRepeatArray.push(body)
            })
            noRepeatArray = Array.from(new Set([...noRepeatArray, ...tempTags]))
            console.log(noRepeatArray, "33333")
            props.edit(props.not_id, text, noRepeatArray)

        }
    }

    return (

        <div className={s.editNote}>
            <div className={s.body}>
                <div className={s.textArea}>

                    <textarea
                        value={text}
                        className={idst.textarea}
                        placeholder='description'
                        onChange={(e) =>
                            setText(e.target.value)}
                    />

                </div>
            </div>
            <div className={s.buttons}>
                <button
                    className={ids.button}
                    onClick={() => {
                        editDescription()
                        props.cancel(false)
                    }}
                >
                    Save
                </button>
                <button
                    className={ids.button}
                    onClick={() => {
                        props.cancel(false)
                    }}>Cancel
                </button>
            </div>
        </div>
    );
};



