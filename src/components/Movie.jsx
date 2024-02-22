import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";

export default function Watch(props) {
  const { id } = useParams();
  const { type } = useParams();
  const [seasons, setseasons] = useState([]);
  const [now, setnow] = useState(type == "tv" ? 1 : "");
  const [enow, setenow] = useState(1);
  const [episodes, setepisodes] = useState(1);
  const [arrayy, setarrayy] = useState([]);
  if (type == "tv") {
    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTI5NmYzMTcyZDM0OTU3MDE2MzNhZTcyY2M4YmY3NSIsInN1YiI6IjY1ZDUwZjVmOTFiNTMwMDE4NjgyMjRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pgz7CxwIa-bZkXmYddEpapXaLQBLtYbzAHjCfJxKX44",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setseasons(data.seasons);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  }

  useEffect(() => {
    const handleFullscreen = () => {
      const iframe = document.getElementById("videoFrame");

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      }
    };

    // Add event listener for the fullscreen button click within the iframe
    const fullscreenButton = document.getElementById("fullscreenButton");
    if (fullscreenButton) {
      fullscreenButton.addEventListener("click", handleFullscreen);
    }

    return () => {
      // Cleanup: remove event listener when the component unmounts
      if (fullscreenButton) {
        fullscreenButton.removeEventListener("click", handleFullscreen);
      }
    };
  }, []);
  function handlechange(elm) {
    setarrayy([]);
    var a=[]
    console.log(elm)
    setepisodes(elm.episode_count);
    setnow(elm.season_number);
    console.log(now, episodes);
    for(let i=1;i<=elm.episode_count;i++){
        a.push(i)
    }

    setarrayy(a);
    console.log(arrayy.length)
  }

  return type == "tv" ? (<Link to='/'><h3><h3/></Link>   <div style={{ height: "50vh", width: "50vh" }}>
        {seasons.map((elm) =>
          elm.episode_count > 0 && elm.name != "Specials" ? (
            <button onClick={()=>handlechange(elm)}>
              {elm.name}
            </button>
          ) : null
        )}
      <select onClick={(e) => setenow(e.target.value)}>
        {arrayy.map((elm) => (
          <option value={elm}>{elm}</option>
        ))}
      </select>
      <iframe 
        id="videoFrame"
        referrerpolicy="origin"
        style={{ height: "100%", width: "100%", border: "none" }}
        src={`https://vidsrc.pro/embed/${type}/${id}/${now ? `${now}` : ""}/${
          enow ? `${enow}` : ""
        }`}
        title="video-frame"
        allowFullScreen
      ></iframe>
      <h3>{`Season ${now} Episode ${enow}`}</h3>
    </div>
  ) : 
    <div style={{ height: "50vh", width: "50vh" }}>
      <iframe
        id="videoFrame"
        referrerpolicy="origin"
        style={{ height: "100%", width: "100%", border: "none" }}
        src={`https://vidsrc.pro/embed/${type}/${id}`}
        title="video-frame"
        allowFullScreen
      ></iframe>
    </div>
  ;
}
