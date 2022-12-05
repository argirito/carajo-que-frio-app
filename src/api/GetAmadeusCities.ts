import axios from 'axios'
import { removeAccents } from '../utils/Utils'

function CleanResults(data: any) {
  const without = data
    .filter((item: any) => item.address.countryCode !== 'US')
    .filter((item: any) => item.address.countryCode !== 'GB')

  const withEEUU = data.filter((item: any) => item.address.countryCode === 'US')
  const withGB = data.filter((item: any) => item.address.countryCode === 'GB')

  if (withEEUU.length > 0) {
    without.push(withEEUU[0])
  }
  if (withGB.length > 0) {
    without.push(withGB[0])
  }

  return without
}

export const getAmadeusCities = (text: string): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const textWithoutFormat = removeAccents(text.toLowerCase())

      const res = await axios({
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        method: 'POST',
        data: 'grant_type=client_credentials&client_id=Qwb9soZOvW41hII2nH2Dmx0nWDGAknGw&client_secret=7db6qb5Osx0XVhXJ',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const { access_token } = res.data

      const resCities = await axios({
        url: `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${textWithoutFormat}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      const { data } = resCities.data

      const filtered = data.filter(
        ({ name }: any) =>
          removeAccents(name.toLowerCase()) === textWithoutFormat
      )
      resolve(CleanResults(filtered))
    } catch (error: any) {
      reject(false)
    }
  })
