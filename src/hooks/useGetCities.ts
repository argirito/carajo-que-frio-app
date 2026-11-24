import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

function useGetCities(text: string) {
  const [cities, setCities] = useState<any[]>([])

  const getToken = useCallback(async () => {
    try {
      const res = await axios({
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        method: 'POST',
        data: `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_CLIENT_ID}&client_secret=${process.env.REACT_APP_AMADEUS_CLIENT_SECRET}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const { access_token } = res.data

      const resCities = await axios({
        url: 'https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=MEDELLIN',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      setCities(resCities.data)

      console.log('eeeee')
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getToken()
  }, [getToken])

  return cities
}

export default useGetCities
