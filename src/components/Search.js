import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

const SearchComp = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const searchFn = props.search

  // const handleSearchInputChanges = e => {
  //   setSearchValue(e.target.value)
  // }

  // const callSearchFunction = e => {
  //   e.preventDefault()
  //   props.search(searchValue)
  //   restInputFiled()
  // }


  // const restInputFiled = () => {
  //   setSearchValue("")
  // }



  const handleSearch = value => {
    searchFn(value)
    setSearchValue(value)
    // restInputFiled()
  }

  return (
    // <form>
    //   <input type="text" value={searchValue} onChange={handleSearchInputChanges}/>
    //   <input type="submit" value="SEARCH" onClick={callSearchFunction} />
    // </form>
    <div style={{width: '500px', margin: '50px auto'}}>
      <Search 
        placeholder="input movie name"
        enterButton="Search"
        size="large"
        defaultValue={searchValue}
        onSearch={value => handleSearch(value)}
      />
    </div>
  )

}

export default SearchComp
