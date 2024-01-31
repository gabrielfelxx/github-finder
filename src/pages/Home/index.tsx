import "./styles.css";
import { useState } from "react";
import api from "../../requests";

import { Box, Alert, IconButton, Collapse } from "@mui/material";
import { Close } from "@mui/icons-material";
import ErrorIcon from '@mui/icons-material/Error';

type GHResponse = {
  name: string;
  public_repos: string;
  avatar_url: string;
  html_url: string;
};

function Home() {
  const [inputValue, setInputValue] = useState("");

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState("");

  const [failed, setFailed] = useState(false);

  async function search() {
    if (inputValue === "") {
      setName("");
      console.log("inputvalue null!");
      return;
    }
    try {
      const response = await api.get<GHResponse>(`${inputValue}`);
      setName(response.data.name);
      setRepos(response.data.public_repos);
      setAvatar(response.data.avatar_url);
      setUrl(response.data.html_url);
      setFailed(false);
    } catch (error) {
      setName("");
      setOpen(true);
      setFailed(true);
      console.log("request failed");
    }
    setInputValue("");
  }

  const goToProfile = () => {
    window.open(url, "_blank");
  };

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

        {failed && (
          <Box sx={{ width: "80%" }}>
            <Collapse in={open}>
              <Alert
                style={{ backgroundColor: "#fefefe" }}
                icon={<ErrorIcon style={{color: "#000"}} />}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Nenhum Usuário Encontrado!
              </Alert>
            </Collapse>
          </Box>
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

export default Home;
