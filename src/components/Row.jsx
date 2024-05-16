import axios from "../api/axios";
import "./Row.css";
import { useCallback, useEffect, useState } from "react";
import MovieModal from './MovieModal/index';
import { imageBasePath } from "../constant";

const Row = ({ title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({})

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    // the movie database API 가져와서 정보 뿌리기
    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
        console.log(response.data.results);
    }, [fetchUrl]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);
    return (
        <div>
            <h2>{title}</h2>
            <div className='slider'>
                <div className='slider__arrow-left'>
                    <span
                        className='arrow'
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 150;
                        }}>
                        {"<"}
                    </span>
                </div>
                <div id={id} className='row__posters'>
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            src={`${imageBasePath}${movie.backdrop_path}`}
                            alt={movie.name}
                            className='row__poster'
                            onClick={() => handleClick(movie)}
                        />
                    ))}
                </div>
                <div className='slider__arrow-right'>
                    <span
                        className='arrow'
                        onClick={() => {
                            document.getElementById(id).scrollLeft += window.innerWidth - 150;
                        }}>
                        {">"}
                    </span>
                </div>
            </div>
            {modalOpen ? <MovieModal {...movieSelected} setModalOpen={setModalOpen}/> : null}
        </div>
    );
};

export default Row;
