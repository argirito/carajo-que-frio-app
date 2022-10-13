import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import WeatherReducer from './Weather.reducer'

export const store = createStore(WeatherReducer, composeWithDevTools())
