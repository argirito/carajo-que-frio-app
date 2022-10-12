import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
// import App from './App';
import reportWebVitals from './reportWebVitals'
import { createRoot } from 'react-dom/client'
import { store } from './redux'
import { Provider } from 'react-redux'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals()
