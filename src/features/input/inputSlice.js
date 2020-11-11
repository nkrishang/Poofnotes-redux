import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userbase from 'userbase-js'
import sha256 from 'js-sha256';

export const uploadNote = createAsyncThunk("input/submitNote", async ({note, file}) => {

    const { title, noteText, color} = note;

    let item;

    if(!title) {
        item = {...note, title: "New note"};
    } else {
        item = {...note};
    }

    const itemId = sha256((title.concat(noteText)).concat(Math.random().toString().substring(2))).toString();

    userbase.insertItem({databaseName: "notes", item, itemId})
    .then(() => {

      if(file) {

        userbase.uploadFile({databaseName: "notes", itemId, file})
        .then(() => {
            console.log("file successfully uploaded");
        })
        .catch((e) => {
            alert("Sorry, there was an error when uploading your file. Please try again.")
            console.log(e);
        })
      }
    })
    .catch((e) => {

      alert("Sorry, there was an error when making your note. Please try again.")
      console.log(e)

    })

    return {title, noteText, color};

})

const initialState = {

    title: '',
    noteText: '',

    style: '',
    color: ''
}

const inputSlice = createSlice({

    name: "input",
    initialState,

    reducers: {

        setStyle(state, action) {

            const style = action.payload;
            state.style = style;

        },

        setContent(state, action) {

            const { title, noteText } = action.payload;
            state.title = title;
            state.noteText = noteText;
        }
    },

    extraReducers: {

        [uploadNote.fulfilled]: (state, action) => {

            const { title, noteText, color} = action.payload;

            state.title = title;
            state.noteText = noteText;
            state.color = color;
        }
    }
})

export const { setStyle, setContent } = inputSlice.actions;

export default inputSlice.reducer;