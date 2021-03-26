import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const inputBusca = useRef();
  const [error, SetError] = useState(false);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    async function fetchPokemon() {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputBusca.current.value.toLowerCase()}/`
      );
      if (response.status === 404 || response.statusText === "Not Found") {
        SetError(true);
      } else {
        SetError(false);
      }
      const json = await response.json();
      setData(json);
      setLoading(false);
    }

    fetchPokemon();
  };

  return (
    <div className="container flex-center">
      <h2>PokeDex</h2>
      <small className="text-muted">Is your pokemon on our Codex?</small>
      <form
        action=""
        className="search-container col-md-5 col-sm-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          id="search_q"
          placeholder="Search pokemon by name"
          required
          ref={inputBusca}
        ></input>
        <button className="btn-search" id="search-btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>

      {/* Exibe se estiver carregando */}
      {loading && !error && <p>Loading....</p>}
      {/* Exibe se não estiver carregando, se não retornar erro, se tiver algum dado */}
      {!loading && !data.erro && data && (
        <>
          <div
            id="show_error"
            className="hidden alert alert-danger alert-dismissible fade"
            role="alert"
          >
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div
            className="col-md-5 col-sm-5 pokemon-card animate__animated animate__bounce animate__delay-90s "
            id="pokemon_details"
          >
            <div className="img-container">
              <img
                id="update_img"
                src={data.sprites.other.dream_world.front_default}
                alt=""
                srcset=""
              ></img>
            </div>

            <div className="detail-container">
              <div className="title-container">
                <h3 className="name text-center" id="update_name">
                  {data.name}
                </h3>
                <hr className="seperator"></hr>
                <div className="stats text-center">
                  <span className="first cp-text col-md-6" id="update_hp">
                    {`HP ${Math.floor(
                      Math.random() * data.stats[0].base_stat + 1
                    )}/${data.stats[0].base_stat}`}
                  </span>
                  <span className="cp-text col-md-6" id="update_cp">
                    XP {data.base_experience}
                  </span>
                </div>
              </div>

              <button className="btn-transfer">TRANSFER</button>

              <div className="attributes-container">
                <div className="col attributes-content">
                  <p className="cp-text" id="update_type">
                    {data.types[0].type.name}/Speed
                  </p>
                  <small className="text-muted">Type</small>
                </div>

                <div className="col attributes-content">
                  <p className="cp-text" id="update_weight">
                    {data.weight}kg
                  </p>
                  <small className="text-muted">Weight</small>
                </div>

                <div className="col attributes-content">
                  <p className="cp-text no-border" id="update_height">
                    {data.height}m
                  </p>
                  <small className="text-muted">Height</small>
                </div>
              </div>

              <div className="player-data">
                <div className="col data-container">
                  <p className="stardust" id="update_stardust">
                    {Math.floor(Math.random() * 10000 + 1)}
                  </p>
                  <p className="muted-text">Stardust</p>
                </div>

                <div className="col data-container">
                  <p className="stardust" id="update_candy">
                    {Math.floor(Math.random() * 200 + 1)}
                  </p>
                  <p className="muted-text" id="update_candy_title">
                    {data.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Exibe se retornar o erro */}
      {error && <p className="error">Pokémon does not exist </p>}
    </div>
  );
};

export default App;
