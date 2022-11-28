import './CitiesColumn.scss'

import { useEffect, useState } from 'react'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import { getAmadeusCities } from '../../api/GetAmadeusCities'
import Button from '../Button/Button'
import CreditsLabel from '../Credits/CreditsLabel'
import Input from '../Input/Input'

const region = new Intl.DisplayNames(['en'], { type: 'region' })

type City = {
  name: string
  countryCode: string
  lat: number
  lon: number
}

function CitiesColumn({
  onSelectCity
}: {
  onSelectCity: (lat: number, lon: number, city: string) => void
}) {
  const [cities, setCities] = useState<City[]>([])
  const [input, setInput] = useState('')
  const [wrongName, setWrongName] = useState(false)

  const searchCities = async (text: string) => {
    if (text !== '') {
      getAmadeusCities(text)
        .then((data: any) => {
          console.log(data)
          setCities(
            data.map((item: any) => ({
              name: item.name,
              countryCode: item.address.countryCode,
              lat: item.geoCode.latitude,
              lon: item.geoCode.longitude
            }))
          )
          setWrongName(false)
        })
        .catch(() => setWrongName(true))
    }
  }

  useEffect(() => {
    if (input === '') {
      setCities([])
      setWrongName(false)
    }
  }, [input])

  const pressEnter = (event: any, input: string) => {
    if (event.keyCode === 13) {
      searchCities(input)
    }
  }

  const citySelected = (lat: number, lon: number, name: string) => {
    onSelectCity(lat, lon, name)
    window.localStorage.setItem(
      'cityDetails',
      JSON.stringify({ lat, lon, name })
    )
    setInput('')
  }

  return (
    <div className="cities-column-container">
      <div className="cities-column-input">
        <Input
          className="input-cities"
          inputProps={{
            value: input,
            placeholder: 'Introduce una ciudad',
            onChange: (event: any) => setInput(event.currentTarget.value),
            onKeyDown: (event: any) => pressEnter(event, input)
          }}
        />
        <Button
          className={`button-cities ${input === '' ? 'disabled' : ''} `}
          onClick={() => searchCities(input)}
        >
          <SearchLineIcon />
        </Button>
      </div>
      <CreditsLabel title="Amadeus" link="https://amadeus.com" />

      <div className="city-map">
        {!wrongName &&
          cities.length > 0 &&
          cities.map((city: any, index: number) => (
            <div
              key={index}
              className="city-item"
              onClick={() => citySelected(city.lat, city.lon, city.name)}
            >
              <div className="city-item__text">{city.name}</div>
              <div className="city-item__country">
                - {region.of(city.countryCode)}
              </div>
            </div>
          ))}
        {wrongName && input !== '' && (
          <div className="city-not-found">
            <div className="city-not-found-text">
              Ciudad no encontrada mi hermano
            </div>
            <img
              className="city-not-found-image"
              src={require(`../../Images/not_city.png`)}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CitiesColumn
