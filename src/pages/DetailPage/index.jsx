import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { imageBasePath } from '../../constant';

const DetailPage = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(movieId)
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`)
      setMovie(response.data)
    }
    fetchData()
  }, [movieId])
  console.log(movie)
  if(!movie) return null;
  return (
    <section>
      <img src={`${imageBasePath}${movie.backdrop_path}`} alt="detail" />
    </section>
  )
}

export default DetailPage