import React from 'react'
import { Card } from 'antd'

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"

const Movie = ({movie}) => {

  const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster

  return (
    <div className="movie">
      <Card 
        title={movie.Title} 
        style={{ width: '100%' }}
        cover={<img 
          width="200"
          alt={`The movie titled: ${movie.title}`}
          src = {poster}
        />}
      >
        <p>({movie.Year})</p>
      </Card>
    </div>
  )
}

export default Movie