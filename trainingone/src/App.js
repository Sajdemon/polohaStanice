import { useState, useEffect } from "react";

const App = () => {
  const url = "http://api.open-notify.org/iss-now.json";
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [urlMap, setUrlMap] = useState("");

  const getCoordinates = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setLatitude(data["iss_position"]["latitude"]);
    setLongitude(data["iss_position"]["longitude"]);
    const iss_long = data["iss_position"]["latitude"];
    const iss_lat = data["iss_position"]["longitude"];
    setUrlMap(`https://mapy.cz/turisticka?x=${iss_long}&y=${iss_lat}&z=8`);
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  return (
    <div>
      <h1>Aktuální poloha Mezinárodní vesmírné stanice</h1>
      <button onClick={getCoordinates}>Aktualizovat polohu</button>
      <h2>Zeměpisná šířka</h2>
      <p>{latitude}</p>
      <h2>Zeměpisná délka</h2>
      <p>{longitude}</p>
      <a href={urlMap} rel="noreferrer" target="_blank">
        Pozice ISS v mapách
      </a>
    </div>
  );
};

export default App;
