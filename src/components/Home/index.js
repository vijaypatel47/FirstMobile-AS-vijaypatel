import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    fetchCharacters("https://swapi.dev/api/people");
  }, []);

  const fetchCharacters = async (url) => {
    try {
      const response = await axios.get(url);
      setCharacters(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage);
    }
  };

  return (
    <div className="home-cont" path="/home">
      <h1 className="heading-font">Star Wars Characters</h1>
      <table>
        <thead>
          <tr>
            <th className="colss">Name</th>
            <th className="colss">Height</th>
            <th className="colss">Mass</th>
            <th className="colss">Gender</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.name}>
              <td className="rowss">{character.name}</td>
              <td className="rowss">{character.height}</td>
              <td className="rowss">{character.mass}</td>
              <td className="rowss">{character.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={handlePrevPage}
          disabled={!prevPage}
          className="buttons btn1"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPage}
          className="buttons"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Home;
