import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    titlebutton:string
    setTitle:string
}

export function AddItemFormNote(props: AddItemFormPropsType) {

    let [title, setTitle] = useState(props.setTitle)
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") { // обычный без #
            props.addItem(title);
            setTitle(props.setTitle);
        } else {
            setError("Title is required");

        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(  e.currentTarget.value)

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <button onClick={addItem} >{props.titlebutton}</button>

        {error && <div className="error-message">{error}</div>}
    </div>
}
