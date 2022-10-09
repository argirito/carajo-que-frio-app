import './App.css'
import React from 'react'
import useGetAmadeusToken from './hooks/useGetAmadeusToken'
const TOKEN = 'xFFdHYjXozVhrdCRzW2lyA2mb4er'

function App() {
  const token = useGetAmadeusToken()

  // function App() {
  //   useEffect(() => {
  //     fetch(
  //       'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200',
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // 'X-Localization': 'es',
  //           Authorization: `Bearer wOCJ5Jj07HAiJqZnVt8g2zcElein`
  //           // Authorization: `Bearer ${TOKEN}`
  //         }
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //   }, [])

  // const getDetails = async () => {
  //   try {
  //     const res = await fetch({
  //       url: 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200',
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'X-Localization': 'es',
  //         Authorization: `Bearer xFFdHYjXozVhrdCRzW2lyA2mb4er`
  //         // Authorization: `Bearer ${TOKEN}`
  //       }
  //     })
  //     // .then((res) => res.json())
  //     // .then((data) => console.log(data))

  //     console.log(res.json())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getDetails()
  // }, [])

  // axios({
  //   url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     method: 'POST',
  //     // grant_type: `client_credentials&client_id=${TOKEN}&client_secret=${'7db6qb5Osx0XVhXJ'}`
  //     // Authorization: `grant_type=client_credentials&client_id=${TOKEN}&client_secret=${'7db6qb5Osx0XVhXJ'}`
  //   },
  // }).then((res) => console.log(res))

  return (
    <div className="App">
      <div className="">{token}</div>
    </div>
  )
}

export default App
