import { createStore, applyMiddleware } from 'redux'
import WeatherReducer from './Weather.reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(WeatherReducer, composeWithDevTools())
