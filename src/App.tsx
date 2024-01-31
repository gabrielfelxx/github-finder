import "./styles.css";
import { useState } from "react";
import api from "./requests";

type GHResponse = {
  name: string;
  public_repos: string;
  avatar_url: string;
  html_url: string;
};

function App() {
  const [inputValue, setInputValue] = useState("");

  const [name, setName] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState("");

  async function search() {
    if (inputValue === "") {
      console.log("inputvalue null!");
      return;
    }
    try {
      const response = await api.get<GHResponse>(`${inputValue}`);
      setName(response.data.name);
      setRepos(response.data.public_repos);
      setAvatar(response.data.avatar_url);
      setUrl(response.data.html_url);
    } catch (error) {
      console.log("request failed");
    }
    setInputValue("");
  }

  const goToProfile = () => {
    window.open(url, '_blank');
  }

  return (
    <>
      <div className="container">
        <h1>GH PROFILE FINDER</h1>

        {name && (
        <div className="user" onClick={goToProfile}>
          <img src={avatar} alt={name + "profile avatar"} />
          <span>{name}</span>
          <span>Repositórios: {repos}</span>
        </div>
        )}

        <div className="search">
          <input
            type="text"
            placeholder="Enter user"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button onClick={search}>Search</button>
        </div>
      </div>
    </>
  );
}

export default App;
