import { useEffect, useState } from 'react'

function useGetAmadeusToken() {
  const [token, setToken] = useState('')

  useEffect(() => {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      body: 'grant_type=client_credentials&client_id=Qwb9soZOvW41hII2nH2Dmx0nWDGAknGw&client_secret=7db6qb5Osx0XVhXJ',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'X-Localization': 'es',
        // Authorization: `Bearer wOCJ5Jj07HAiJqZnVt8g2zcElein`
        // Authorization: `Bearer ${TOKEN}`
      },
      method: 'POST'
    })
      .then((res) => res.json())
      .then((data) => setToken(data.access_token))
      .catch((error) => console.log(error))
  }, [])

  return token
}

export default useGetAmadeusToken
