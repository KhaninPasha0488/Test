import React from 'react';
import cl from "./TagList.module.scss"
import {TagType} from "../Notes/Notes";



export type TagTypeProps = {
     noteId: number
    deleteTag: (not_id: number, id:number) => void
    tag:TagType
}

export const Tag = (props:TagTypeProps) => {
    return (
        <div key={props.tag.id} className={cl.item}>
                    <span className={cl.tag} onClick={() => {
                        props.deleteTag(props.noteId,props.tag.id)
                    }}>
                        {props.tag.body}
                    </span>
        </div>
    );
};

