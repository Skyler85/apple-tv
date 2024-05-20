import axios from "../../api/axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imageBasePath } from "../../constant";
import styled from "styled-components";
import "./DetailPage.css";

const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (e) => {
        if (!ref.current || ref.current.contains(e.target)) {
          return;
        }
        handler(e);
      }
      document.addEventListener('mousedown', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
  
      }
    }, [ref, handler])
  }

const DetailPage = (ref, handler) => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(movieId);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/movie/${movieId}`);
            setMovie(response.data);
        }
        fetchData();
    }, [movieId]);

    useOnClickOutside(ref, () => {
        handleClose()
    })
    const navigate = useNavigate();
    const handleClose = () => {
        navigate(-1);
    }

    const { backdrop_path, title, overview, name, release_date, first_air_date, vote_average} = movie;
    if (!movie) return null;
    return (
        <ModelDetailPage id='detail-modal'>
            <div className='wrapper-modal'>
                <div className='modal'>
                <span className='modal-close' onClick={() => handleClose()}>
                        X
                    </span>
                    {(backdrop_path !== undefined) ? 
                    <img src={`${imageBasePath}${backdrop_path}`} alt='detail' className='modal__poster-img' />
                    
                    :
                    "관련된 영화가 없습니다."
                    }

                    
                    <div className='modal__content'>
                        <p className='modal__details'>
                            <span>100% for you</span> {release_date ? release_date : first_air_date}
                        </p>
                        <h2 className='modal__title'>{title ? title : name}</h2>
                        <p className="modal__overview">평점 : {vote_average}</p>
                        <p className="modal__overview">{overview}</p>
                    </div>
                </div>
            </div>
        </ModelDetailPage>
    );
};

const ModelDetailPage = styled.div`
    z-index: 1200;
    position: absolute;
`;

export default DetailPage;
