import React from 'react';
import '../../App.css';
import '../../output.css'

import deleteicon from '../../assets/x.svg';
import attachLogo from '../../assets/paperclip.svg';

import { TwitterShareButton, TwitterIcon } from 'react-share'

import Image from '../../utils/media';
import CircularProgress from '@material-ui/core/CircularProgress';

import userbase from 'userbase-js'

import { useLocation } from 'react-router-dom'

function StickyNote({itemId, fileId, noteContent}) {

    // Router assignment (get url for sharing purposes)
    const location = useLocation();

    // Locally managed state
    
    const [source, setSource] = React.useState('');

    const [hover, setHover] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [mediaDisplay, setMediaDisplay] = React.useState(false);

    const {title, noteText, noteStyle, file}  = noteContent;
  
    // Handlers

    const handleMedia = () => { 

      if(!source) {

        setLoading(true)
        userbase.getFile({databaseName: "notes", fileId: fileId})
          .then(({ file }) => {
              
            const url = URL.createObjectURL(file)

            if(!file.type.includes("image")) {
              window.open(url, "_blank")
            } else {
              setSource(url)
            }

            setLoading(false)
            setMediaDisplay(!mediaDisplay)

          })
          .catch((e) => {

              setLoading(false)
              setMediaDisplay(false)
              alert("Your file may take a moment to upload. Give it a second and then check again!")
              console.log(e)
          })

      } else {

        setMediaDisplay(!mediaDisplay)
      }
      
    }


    const handleDelete =() => {
        userbase.deleteItem({databaseName: "notes", itemId: itemId})
        .then(() => {})
    }



  return (
    <div className="Sticky-Note mx-4 my-6 flex">

      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={noteStyle} style={{height: "360px", width: "320px"}}>

        <button onClick={handleDelete} style={{display: `${hover ? '' : `none`}`}} className=" my-2 mx-4 float-right">
          <img style={{opacity:"0.3"}} src={deleteicon} alt="delete"/>
        </button>

        <div className="font-bold mx-2 px-4 py-4 leading-6 text-lg h-16">
          {title}
        </div>

        <div className="mx-2 px-4 font-mono h-56" style={{whiteSpace: "pre-line"}}>
          {noteText}
        </div>

        <div className="flex justify-end mx-4 my-4">

          <button className="" onClick={handleMedia}>
            <img style={{opacity: `${mediaDisplay ? '0.8' : '0.3'}`, display: `${file ? '' : 'none'}`}} src={attachLogo} alt="attach" className="m-2"/>
          </button>

          <TwitterShareButton
            url={`https://poofnotes.com${location.pathname}`}
            title={noteText}
            className="m-2">
            <TwitterIcon
              size={32}
              round={true} />
          </TwitterShareButton>
        </div>
      </div>

      <div style={{display: `${loading ? '' : 'none'}`}} className="mx-2">
        <CircularProgress />
      </div>
      <div style={{height: "350px", width: "auto", display: `${mediaDisplay ? '' : 'none'}`}} className="">
        <Image src={source}/>
      </div>
      
    </div>
  );
}

export default StickyNote;