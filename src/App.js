import { useEffect, useState } from 'react';
import './App.css';
import {Auth} from './Component/auth.js'
import { db,auth,storage} from './config/firebase-config.js';
import {getDocs,collection,addDoc,deleteDoc,doc, updateDoc} from 'firebase/firestore'
import { async } from '@firebase/util';
import { ref, uploadBytes } from 'firebase/storage';
function App() {
  const[movieList,SetMovieList]=useState([]);
  const[NewMovieTitle,SetNewMovieTitle]=useState({title:"",releaseDate:0,receivedOscar:false});
  const[UpdatedTitle,SetUpdatedTitle]=useState("")
  const[fileUpload,SetFileUpload]=useState(null);
const MovieReference=collection(db,"movies");

  useEffect(()=>
  {
    const getMovieList= async()=>
  {
    try{

      const data=await getDocs(MovieReference);
      const filterdData=data.docs.map((doc)=>
      ({
        ...doc.data(),id:doc.id,
      }))
      SetMovieList(filterdData);
      console.log(movieList);

    }
    catch(err)
    {
      console.log(err);
    }
  }
  getMovieList();

  },[])

  const SendToDb=async()=>
  {
    try{
      await addDoc(MovieReference,
        {title:NewMovieTitle.title,
        releaseDate:NewMovieTitle.releaseDate,
        receivedOscar:NewMovieTitle.receivedOscar,
        userId:auth?.currentUser?.uid
      });
    }
    catch(err)
    {
      console.log(err);
    }
    
  }

  function Newmovielistinputtodb(e)
  {
    const{name,value}=e.target;
    SetNewMovieTitle((pre)=>
    {
        return{
           ...pre,
           [name]:value,
        }
    })
  }

  const DeleteMovie=async(id)=>
  {
    const movieDoc=doc(db,"movies",id);
    await deleteDoc(movieDoc);
  }
  const UpdateMovie=async(id)=>
  {
    const movieDoc=doc(db,"movies",id);
    await updateDoc(movieDoc,{title:UpdatedTitle});
  }

  function updateExistingTitle(e)
  {
    SetUpdatedTitle(e.target.value);
  }

  //Take the files from firebase storage
  const uploadFiles=async()=>
  {
    if(!fileUpload) return;
    const filesFolderref=ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderref,fileUpload);

    }
    catch(err)
    {
      console.log(err);
    }
  }
   
  return (
    <div className="App">
     <Auth />
     <div className='senddatato-db'>
    <input placeholder='enter title' name="title" onChange={Newmovielistinputtodb}/>
    <input type="number" placeholder='enter year' name="releaseDate" onChange={Newmovielistinputtodb}/>
    <input type="checkbox"  name="receivedOscar" /><label>Received Oscar</label>
    <button onClick={SendToDb}>SendToDb</button>


     </div>
     {movieList.map((movies,index)=>
     {
     return <div key={index}>
        <h3>{movies.title}</h3>
        <p>{movies.releaseDate}</p>
        <input onChange={updateExistingTitle}/>
        <button onClick={()=>{DeleteMovie(movies.id)}}>Delete</button>
        <button onClick={()=>{UpdateMovie(movies.id)}}>UpdateMovie</button>

      </div>
     })}
     <div>
      <input type="file" onChange={(e) => SetFileUpload(e.target.files[0])}></input>
      <button onClick={uploadFiles}>uploadFile</button>
     </div>

    </div>
  );
}

export default App;
