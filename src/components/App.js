import React, { useReducer, useEffect } from 'react';
import './App.css';
import Movie from './Movie'
import Header from './header'
import Search from './Search'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=mission&apikey=99fc8e27"

const initialState = {
  loading: true,
  moves: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state  
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        })
      })
  }, [])

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=99fc8e27`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className='App'>
      <Header text="HOOKED" />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favorite movies</p>
      <div className="movies">
        {
          loading && !errorMessage ? (
            <span>loading....</span>
          ) : errorMessage ? (
            <div className='errorMessage'>{errorMessage}</div>
          ) : (
            movies && movies.map((movie, index) => 
              <Movie key={`${index}-${movie.title}`}  movie={movie}/>
            )
          )
        }
      </div>
    </div>
  )

}

export default App;
