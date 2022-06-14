import React, {useState} from 'react';
import {findTags} from "../../../utils/findTags";
import {TagType} from "../Notes/Notes";
import cl from "./TagList.module.scss"
import comm from "../commonstyle/Botton.module.scss";
import cominp from "../commonstyle/Input.module.scss";
import {Tag} from "./Tag";

export type TagListType = {
    tags: TagType[]
    addTag: (not_id: number, tag: string) => void
    noteId: number
    deleteTag: (not_id: number, id: number) => void

}


export const TagList = (props: TagListType) => {
    const [isEdit, setIsEdit] = useState(false)
    const [tagValue, setTagValue] = useState('#')
    const save = () => {
        const tempTags = findTags(tagValue)
        if (tempTags?.length === 1) {
            if (props.tags.find(tag => tag.body === tempTags[0])) {
                setTagValue('Error: you must enter a new tag')
            } else {
                props.addTag(props.noteId, tempTags[0])
                setIsEdit(false)
                setTagValue('#')
            }

        } else {
            setTagValue('Error: your tag must starts with "#"')
        }

    }
    return (
        <div className={cl.list}>
            {!isEdit ?

                <div className={cl.tags}>
                    {props.tags.map(tag =>
                        <Tag tag={tag} key={tag.id + Math.random()}
                             deleteTag={props.deleteTag}
                             noteId={props.noteId}
                        />
                    )
                    }

                </div> : <input
                    value={tagValue}
                    className={cominp.input}
                    onChange={(e) =>
                        setTagValue(e.target.value)}/>}

            <div className={cl.button}>
                {!isEdit ? <button
                        className={comm.button}
                        onClick={() => {
                            setIsEdit(true)
                        }}>Add tag</button>
                    : <>
                        <button
                            className={comm.button}
                            onClick={() => save()}>
                            Save
                        </button>
                        <button
                            className={comm.button}
                            onClick={() => {
                                setTagValue("#")
                                setIsEdit(false)
                            }
                            }>Back
                        </button>
                    </>}
            </div>
        </div>
    );
};

