import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [id,setid]=useState()
  const [type,settype]=useState()
  const [name,setname]=useState("")
  const [info,setinfo]=useState([])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/search/multi?query=${name}&language=en-US&page=1`,
    {headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTI5NmYzMTcyZDM0OTU3MDE2MzNhZTcyY2M4YmY3NSIsInN1YiI6IjY1ZDUwZjVmOTFiNTMwMDE4NjgyMjRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pgz7CxwIa-bZkXmYddEpapXaLQBLtYbzAHjCfJxKX44'
    }})
    .then(res=>res.json())
    .then(data=>(setinfo(data.results),settype()))
  },[name])


  return (
    <div>
      
      <table>
      <input type="text" onChange={(e)=>setname(e.target.value)} />
        <thead>
          {info.map((elm,index)=>(elm.title?<tr key={index} ><button onClick={()=>setid(elm.id)}>{elm.title}</button></tr>:null))}
        </thead>
      </table>
      <iframe src={`https://vidsrc.to/embed/movie/${id}`} width="1000px" height="500px" frameborder="0"></iframe>
    </div>
  )
  
}

export default App
