import '../assets/styles/Details.css';

export default function Details(props) {
  console.log(props);
  const handleShowDetails = (id) => {
    props.fetchMain(1);
    props.setShowDetails(false);
  };
  if (props.details) {
    const show = props.details.tvShow;

    return (
      <>
        <div className="head">
          <p onClick={(e) => handleShowDetails()}>{'<<<<<<'}</p>
          <h2>{show?.name}</h2>
        </div>
        <div className="detailsContainer">
          <div className="primaryInfo">
            <div className="imageProfile">
              <img src={show?.image_path}></img>
            </div>
            <div className="showInfo">
              <p>Genero: {show?.genres.join(', ')}</p>
              <p>Plataforma: {show?.network}</p>
              <p>Estado: Ended</p>
              <p>Lanzamiento: {show?.start_date}</p>
              <p>
                Calificacion: {show?.rating} from {show?.rating_count} users
              </p>
            </div>
          </div>
          <h2>Sinopsis</h2>
          <div className="descriptionInfo">
            <span>{show?.description}</span>
          </div>
          <br></br>
          <h2>Episodios</h2>
          <div className="episodesInfo">
            {show?.episodes.map((e) => (
              <div className="episode-card">
                <h3>Nombre: {e.name}</h3>
                <p>Episodio: {e.episode}</p>
                <p>Temporada:{e.season}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
