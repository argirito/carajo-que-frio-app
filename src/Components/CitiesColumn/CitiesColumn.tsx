import { useState, useEffect } from 'react'
import { getAmadeusCities } from '../../api/GetAmadeusCities'
import Button from '../Button/Button'
import Input from '../Input/Input'

function CitiesColumn({
  onSelectCity
}: {
  onSelectCity: (lat: string, lon: string) => void
}) {
  const [cities, setCities] = useState<any[]>([])
  const [input, setInput] = useState('')

  const searchCities = async (text: string) => {
    getAmadeusCities(text).then((data: any) => {
      setCities(data)
      const lat = data[0].geoCode.latitude
      const lon = data[0].geoCode.longitude
      onSelectCity(lat, lon)
    })
  }

  return (
    <div className="cities-column-container">
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
  )
}

export default CitiesColumn
