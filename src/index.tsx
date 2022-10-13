import React from 'react'
import App from './App'
import './index.css'
// import App from './App';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
