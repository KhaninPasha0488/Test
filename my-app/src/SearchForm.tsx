import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
type AddSearchFormPropsType = {
    searchItem: (title:string) => void
    titlebutton:string
}
export const SearchForm = (props:AddSearchFormPropsType) => {

    let [title, setTitle] = useState("#")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "" && title[0] === "#") {
            props.searchItem(title);
            setTitle("");
        } else {
            setError("Error: your tag must starts with '#'");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
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

        {error && <div className="error-message">{error}</div>}
    </div>
};

