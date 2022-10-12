import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import useGetCities from './hooks/useGetAmadeusToken'
import { store } from './redux'

function App(state: any) {
  const data = useGetCities()

  console.log(data)

  return (
    <div className="App">
      <div className="">
        <h2>{state.state}</h2>
        <h2>{state.state}</h2>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => store.dispatch({ type: 'RESET' })}>reset</button>
      </div>
    </div>
  )
}

const mapStateToProps = (store: any) => ({
  state: store
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
