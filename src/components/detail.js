import React from "react";
import { onLoadGetMovie, getCompanyDetails } from "../api/moviedb";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      companies: [],
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    // on récupère le paramètre id, puis on requete via ajax le détail d'un film
    onLoadGetMovie(id)
      .then((movie) => {
        this.setState({ movie: movie });

        movie.production_companies.map((company) => {
          // let companies = this.state.companies;
          // companies.push(company)
          //this.setState({companies: companies});

          // quand on a récupéré l'id des company on peut les requêter
          getCompanyDetails(company.id).then((response) => {
            this.setState(
              { companies: [...this.state.companies, response] },
              () => {
                console.log(this.state);
              }
            );
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    //url de base des images stoquées dans l'api
    const url_img = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";

    return (
      <div id="result">
        <div className="header_menu">
          <a href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </div>

        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              {this.state.movie !== null && (
                <div>
                  <img
                    className="locandina"
                    src={url_img + this.state.movie.poster_path}
                  />
                  <h1>{this.state.movie.original_title}</h1>
                  <h4>
                    {moment(this.state.movie.release_date)
                      .locale("fr")
                      .format("LL")}
                  </h4>
                  <span className="minutes">{this.state.movie.runtime}</span>
                  {this.state.movie.genres.map((genre) => {
                    return <p className="type">{genre.name}</p>;
                  })}

                  <div class="movie_desc">
                    <p className="text">{this.state.movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PARTIE CSS COPIE */}
      </div>
    );
  }
}

export default Detail;

/* 
 <div class="movie_card" id="bright">
          <div class="info_section">
            <div class="movie_header">
              <img
                class="locandina"
                src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
              />
              <h1>Bright</h1>
              <h4>2017, David Ayer</h4>
              <span class="minutes">117 min</span>
              <p class="type">Action, Crime, Fantasy</p>
            </div>
            <div class="movie_desc">
              <p class="text">
                Set in a world where fantasy creatures live side by side with
                humans. A human cop is forced to work with an Orc to find a
                weapon everyone is prepared to kill for.
              </p>
            </div>
            <div class="movie_social">
              <ul>
                <li>
                  <i class="material-icons">share</i>
                </li>
                <li>
                  <i class="material-icons"></i>
                </li>
                <li>
                  <i class="material-icons">chat_bubble</i>
                </li>
              </ul>
            </div>
          </div>
          <div class="blur_back bright_back"></div>
        </div>
      </div> */
