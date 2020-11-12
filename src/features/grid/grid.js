import React from 'react';
import '../../App.css';
import '../../output.css';

import userbase from 'userbase-js';

import StickyNote from '../note/note';

function Grid() {

    // Locally managed state

    const [notes, setNotes] = React.useState([]);
    
    // DB call for notes

    React.useEffect(() => {
    
        userbase.openDatabase({databaseName: "notes", changeHandler})
        // console.log("Effect working")
    }, [])
    
    const changeHandler = (items) => {
        const reversedItems = items.reverse();
        setNotes(reversedItems)
        console.log(items)
        // console.log("changeHandler working")

    }
    
    return (

        <div className="m-auto my-4 w-4/5 h-auto">
            <ul className="flex justify-center flex-wrap">

                {notes.map((note) => {

                    return <li key={note.itemId}>
                    <StickyNote itemId={note.itemId} noteContent={note.item} fileId={note.fileId}/>
                    </li>
                })}
            
            </ul>
      </div>
    )
}

export default Grid;