import React from "react";
import { Link } from "react-router-dom";
import { SearchMoviesWithKeyWord } from "../api/moviedb";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      movies: [],
    };
  }

  // fonction qui se déclenche lors de l'envoie du formulaire
  onSubmitSearchMoviesWithKeyWord = () => {
    SearchMoviesWithKeyWord(this.state.text)
      .then((response) => {
        this.setState({ movies: response.results });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <p>Moteur de recherche de film</p>
        <div className="form">
          <p>Inserez un mot clé</p>
          <form
            onSubmit={(e) => {
              //déclenchement d'un event listener
              e.preventDefault();
              this.onSubmitSearchMoviesWithKeyWord();
            }}
          >
            <input
              type="text"
              value={this.state.text}
              name="search"
              id="search"
              onChange={(e) => {
                // déclenchement d'un évenement change
                this.setState({ text: e.currentTarget.value });
              }}
            />
            <button type="submit"> Rechercher </button>
          </form>
        </div>
        {this.state.movies.length > 0 && (
          <div className="info">
            <div id="list">
              {this.state.movies.map((movie) => {
                // on affiche la liste des film
                return (
                  <li key={movie.id}>
                    <Link to={"/detail/" + movie.id}>{movie.title}</Link>
                  </li>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
