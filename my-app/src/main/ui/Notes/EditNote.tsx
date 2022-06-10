import React, {useState} from 'react';
import {TagType} from "./Notes";
import {findTags} from "../../../utils/findTags";
import s from "./EditNote.module.scss"

export type EditNoteType = {
    id: number
    edit: () => void
    addTag: (id:number) => void
    deleteTag: () => void
    tagList: TagType[]
    description: string
    cancel :(N:boolean) => void
}

export const EditNote = (props:EditNoteType) => {

    const [text, setText] = useState(props.description)
    const onChange = (text:string) => setText(text)
    // const editDescription = () => {
    //     const tempTags = findTags(text)
    //     let noRepeatArray:Array<any> = []
    //     if (tempTags) {
    //         props.tagList.forEach(({body}) => {
    //             noRepeatArray.push(body)
    //         })
    //         noRepeatArray = Array.from(new Set([...noRepeatArray, ...tempTags]))
    //         props.addTag(id, noRepeatArray)
    //         props.edit(id, text, noRepeatArray)
    //     } else {
    //         props.edit(id, text)
    //     }
    // }

     // const highlightTemplate = useFindWords(props.tagList, text)
    return (
        <div className={s.editNote}>
            <div className={s.body}>
                <div className={s.textArea}>
                    {/*<HighlightWithinTextarea placeholder='description' value={text}*/}
                    {/*                         onChange={onChange}*/}
                    {/*                         highlight={highlightTemplate}*/}

                    {/*/>*/}
                    <textarea
                        placeholder='description'
                               value={text}
                        onChange={()=>onChange(text)}
                        // highlight={highlightTemplate}
                    />
                </div>
            </div>
            <div className={s.buttons}>
                {/*<button onClick={() => {*/}
                {/*    editDescription()*/}
                {/*    props.cancel(false)*/}
                {/*}}>Save</button>*/}
                <button onClick={() => {
                    props.cancel(false)
                }}>Cancel</button>
            </div>
        </div>
    );
};



