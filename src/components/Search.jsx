import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Search(){
    const [id, setid] = useState();
  const [type, settype] = useState();
  const [name, setname] = useState("");
  const [info, setinfo] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${name}&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTI5NmYzMTcyZDM0OTU3MDE2MzNhZTcyY2M4YmY3NSIsInN1YiI6IjY1ZDUwZjVmOTFiNTMwMDE4NjgyMjRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pgz7CxwIa-bZkXmYddEpapXaLQBLtYbzAHjCfJxKX44",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setinfo(data.results);
        settype();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name]);

    return(
        <div style={{height: '90vh'}} >
      <label >Search</label>
	<input id="search" onChange={(e) => setname(e.target.value)} type="search" pattern=".*\S.*" required/>
	<span class="caret"></span>
    <div className="grid-container">
        {info.map((elm) =>
          elm.poster_path ? (<Link to={`/watch/${elm.title?"movie":'tv'}/${elm.id}`} ><img 
              style={{ borderRadius: "10px" }}
              src={`https://image.tmdb.org/t/p/w220_and_h330_face/${elm.poster_path}`}
            /></Link>) : null
        )}
      </div>

      
    </div>
    )
}