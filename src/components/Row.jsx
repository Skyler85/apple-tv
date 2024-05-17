import axios from "../api/axios";
import "./Row.css";
import { useCallback, useEffect, useState } from "react";
import MovieModal from "./MovieModal/index";
import { imageBasePath } from "../constant";
import styled from "styled-components";

// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Row = ({ title, id, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

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
        <Container>
            <h2>{title}</h2>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}>
                <div id={id} className='row__posters'>
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Wrap>
                                <img
                                    src={`${imageBasePath}${movie.backdrop_path}`}
                                    alt={movie.name}
                                    className='row__poster'
                                    onClick={() => handleClick(movie)}
                                />
                            </Wrap>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            {modalOpen ? <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> : null}
        </Container>
    );
};

const Container = styled.div`
    padding: 0 0 26px;
`;

const Wrap = styled.div`
width: 95%;
height: 95%;
padding-top: 56.25%;
border-radius: 10px;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
cursor: pointer;
overflow: hidden;
position: relative;
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
border: 3px solid rgba(249, 249, 249, 0.1);
img {
  inset: 0px;
  display: block;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  position: absolute;
  transition: opacity 500ms ease-in-out 0s;
  width: 100%;
  z-index: 1;
  top: 0;
}
&:hover {
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
    rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  transform: scale(0.98);
  border-color: rgba(249, 249, 249, 0.8);
`;

export default Row;
