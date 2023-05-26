import { useState, useEffect } from 'react';
import '../assets/styles/Cards.css';
import Details from './Details';
export default function ShowCards() {
  const [tvShowList, setTvShowList] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState();

  const fetchPopularShows = async (page) => {
    try {
      const response = await fetch(
        `https://www.episodate.com/api/most-popular?page=${pagination}`
      );

      const data = await response.json();
      setTvShowList(data.tv_shows);
      setPages(data.pages);
      setTitle('Mas populares:');
    } catch (error) {
      console.error('Error al obtener los TV shows más populares:', error);
    }
  };

  const fetchShowDetails = async (id) => {
    try {
      const response = await fetch(
        ` https://www.episodate.com/api/show-details?q=${id}`
      );

      const data = await response.json();
      setDetails(data);
      console.log(data);
      setTitle('');
    } catch (error) {
      console.error('Error al obtener los TV shows más populares:', error);
    }
  };

  const fetchSearchShows = async (page) => {
    try {
      const response = await fetch(
        `https://www.episodate.com/api/search?q=${searchValue}&page=${page}`
      );

      const data = await response.json();

      setTvShowList(data.tv_shows);
      setPages(data.pages);

      if (data.tv_shows.length == 0) {
        setTitle('No se encontraron shows');
        setPages(0);
      } else {
        setTitle('Encontrado:');
      }
    } catch (error) {
      console.error('Error al obtener los TV shows más populares:', error);
    }
  };

  useEffect(() => {
    if (searchValue != '') {
      setPagination(1);
      fetchSearchShows();
    } else {
      setPagination(1);
      fetchPopularShows();
    }
  }, [searchValue]);

  const handlePageChange = () => {
    setPagination(pagination + 1);
  };

  const handleBackPageChange = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };
  let delay = null;

  const handledelaySearch = (value) => {
    clearTimeout(delay);
    delay = setTimeout(() => {
      setSearchValue(value);
    }, 500);
  };

  const handleShowDetails = async (id) => {
    await fetchShowDetails(id);
    setSearchValue('');
    setShowDetails(true);
  };
  useEffect(() => {
    if (searchValue == '') {
      fetchPopularShows(pagination);
      console.log('test');
    } else {
      fetchSearchShows(pagination);
    }
  }, [pagination, showDetails]);
  if (!showDetails) {
    return (
      <>
        <div className="searchBar">
          <div className="inputCover">
            <input
              className="search"
              id="search"
              onChange={(event) => handledelaySearch(event.target.value)}
              placeholder="Buscar"
            />
          </div>
        </div>

        <h2>{title}</h2>
        <div className="container">
          {tvShowList.map((show) => (
            <div key={show.id} className="book">
              <div className="showData">
                <p>Lanzamiento: </p>
                <span>{show.start_date}</span>
                <p>Plataforma: </p>
                <span>{show.network}</span>
              </div>
              <button
                className="full-rounded "
                onClick={(e) => handleShowDetails(show.id)}
              >
                <span>Detalles</span>
                <div className="border full-rounded"></div>
              </button>
              <div
                className="cover"
                style={{ backgroundImage: `url(${show.image_thumbnail_path})` }}
              >
                <p>{show.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {pagination > 1 && (
            <button onClick={handleBackPageChange}>{'<<<<<'}</button>
          )}
          {pages !== 0 && <p>{pagination}</p>}
          {pagination < pages && pages !== 0 && (
            <button onClick={handlePageChange}>{'>>>>>'}</button>
          )}
        </div>
      </>
    );
  } else {
    return (
      <Details
        details={details}
        setShowDetails={setShowDetails}
        fetchMain={setPagination}
      />
    );
  }
}
