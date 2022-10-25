import './CitiesColumn.scss'

import { useState, useEffect } from 'react'
import { getAmadeusCities } from '../../api/GetAmadeusCities'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { c } from '../../App'

const region = new Intl.DisplayNames(['en'], { type: 'region' })

function CitiesColumn({
  onSelectCity
}: {
  onSelectCity: (lat: number, lon: number) => void
}) {
  const [cities, setCities] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [wrongName, setWrongName] = useState(false)

  const searchCities = async (text: string) => {
    getAmadeusCities(text)
      .then((data: any) => {
        setCities(data)
        const lat = data[0].geoCode.latitude
        const lon = data[0].geoCode.longitude
        onSelectCity(lat, lon)
      })
      .catch(() => setWrongName(true))
  }

  return (
    <div className="cities-column-container">
      <div className="cities-column-input">
        <Input
          className="input-cities"
          inputProps={{
            value: input,
            onChange: (event: any) => setInput(event.currentTarget.value)
          }}
        />
        <Button className="button-cities" onClick={() => searchCities(input)}>
          Ok
        </Button>
      </div>
      <div className="city-map">
        {cities.map((city: any, index: number) => (
          <div key={index} className="city-item">
            <div className="city-item__text">{city.name}</div>
            <div className="city-item__country">
              - {region.of(city.address.countryCode)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CitiesColumn
