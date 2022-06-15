import React from 'react';

import './App.scss';
import data from "../../data/data.json"
import {Notes} from "../Notes/Notes";


export const App = () => {


    return (

        <div className="App">
            <Notes notes={data.notes}/>
        </div>
    );
};

