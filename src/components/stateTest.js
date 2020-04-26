import React, { useState, useEffect } from 'react'

export default () => {

  const [count, setCount] = useState(0)

  useEffect(()=>{
    document.title = `You clicked ${count} times`
  })

  const increment = () => {
    setCount(previous => previous + 1)
    console.log('加一后', count)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>
        Click me
      </button>
    </div>
  )

}