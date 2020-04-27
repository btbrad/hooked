import React, { useReducer, useEffect } from 'react';
import './App.css';
import Movie from './Movie'
import Header from './header'
import Search from './Search'
import { Spin, Pagination } from 'antd'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=mission&apikey=99fc8e27"

const initialState = {
  loading: true,
  moves: [],
  searchValue: 'mission',
  total: 0,
  errorMessage: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
        searchValue: action.payload
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload.Search,
        total: action.payload.totalResults
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
          payload: jsonResponse
        })
      })
  }, [])

  const search = (searchValue, page=1) => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
      payload: searchValue
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=99fc8e27&page=${page}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  }

  const { movies, errorMessage, loading, total, searchValue } = state

  return (
    <div className='App'>
      <Header text="Movie Engine" />
      <Search search={search} />
      <p className='App-intro'>Sharing a few of our favorite movies</p>
      <Spin size="large" spinning={loading}>
        <div className="movies">
          {
            errorMessage ? (
              <div className='errorMessage'>{errorMessage}</div>
            ) : (
              movies && movies.map((movie, index) => 
                <Movie key={`${index}-${movie.title}`}  movie={movie}/>
              )
            )
          }
        </div>
      </Spin>
      {movies && movies.length && <Pagination defaultCurrent={1} total={total} showSizeChanger={false} onChange={(page)=>{ search(searchValue, page) }}/>}
    </div>
  )

}

export default App;
