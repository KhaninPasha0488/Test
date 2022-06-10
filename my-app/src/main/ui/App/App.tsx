import React from 'react';

import './App.scss';
import data from "../../data/data.json"
import {Notes, NotesPropsType} from "../Notes/Notes";


 export const App = () => {
     console.log(data.notes)
    return (

            <div className="App">
                <Notes notes={data.notes} />
            </div>
    );
};

