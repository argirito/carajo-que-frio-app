export const countryTimeZone = require('countries-and-timezones')

export const isFog = (code: number) => {
  return [45, 48].indexOf(code) > -1
}

export const isRain = (code: number) => {
  return [51, 53, 55, 60, 61, 62, 63, 66, 67, 80, 81, 82].indexOf(code) > -1
}

export const isSnow = (code: number) => {
  return [71, 73, 75, 77].indexOf(code) > -1
}

export const isStorm = (code: number) => {
  return [95, 96, 99].indexOf(code) > -1
}

const cloudly =
  'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const cloudlyNight =
  'https://images.pexels.com/photos/8394982/pexels-photo-8394982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const rainDay =
  'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const rainNight =
  'https://img.freepik.com/foto-gratis/gotas-lluvia-ventana_1339-7321.jpg?w=2000&t=st=1666988402~exp=1666989002~hmac=c13fda53e6c1055bebd235b5dc8330f1a4eb09aa493f4fdcfacb1084cb9be413'
const clearDay =
  'https://images.pexels.com/photos/12015374/pexels-photo-12015374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const clearNight =
  'https://img.freepik.com/foto-gratis/hermosa-foto-primer-plano-extremo-media-luna_181624-4157.jpg?w=2000&t=st=1666988698~exp=1666989298~hmac=3c2021da0db14c048f4bf06b2e0ffb100f9249de4e52d6df6391e201ed871f3a'
const fog =
  'https://img.freepik.com/fotos-premium/carretera-escenica-grandes-arboles-niebla-mistica-niebla-dia-otono_379823-3801.jpg?w=2000'
const fogNight =
  'https://img.freepik.com/fotos-premium/siluetas-arboles-oscuros-bosque-espeluznante-niebla-nocturna-resplandor-misterioso-ilustracion-digital-3d_124717-1601.jpg?w=2000'

const storm =
  'https://images.pexels.com/photos/1123445/pexels-photo-1123445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

const stormNight =
  'https://images.pexels.com/photos/11019539/pexels-photo-11019539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

const snow =
  'https://img.freepik.com/foto-gratis/paisaje-carretera-selva-negra-cubierta-arboles-nieve-alemania_181624-54214.jpg?w=2000&t=st=1671226661~exp=1671227261~hmac=3a4300d4b4508a02e1b44d16000b7fb952fb31eb039f69a3bc69ae7b3123078f'
const snowNight =
  'https://images.pexels.com/photos/358235/pexels-photo-358235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

export const typeBackground = (
  code: number,
  date: string | Date,
  countryCode: string
) => {
  const country = countryTimeZone.getCountry(countryCode)

  const dateHour = new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: country.timezones[0]
    })
  )

  if ([0, 1].indexOf(code) > -1) {
    return isNight(dateHour) ? clearNight : clearDay
  }
  if ([2, 3].indexOf(code) > -1) {
    return isNight(dateHour) ? cloudlyNight : cloudly
  }
  if (isFog(code)) {
    return isNight(dateHour) ? fogNight : fog
  }
  if (isRain(code)) {
    return isNight(dateHour) ? rainNight : rainDay
  }
  if (isStorm(code)) {
    return isNight(dateHour) ? stormNight : storm
  }
  if (isSnow(code)) {
    return isNight(dateHour) ? snowNight : snow
  }
  return clearNight
}

export const isNight = (d?: Date): boolean => {
  let date = new Date()

  if (d) {
    date = d
  }

  const actualMonth = date.getMonth()
  const summerTime = actualMonth >= 5 && actualMonth <= 9

  const actualHour = date.getHours()

  if (actualHour >= 0 && actualHour < 7) {
    return true
  }
  if (!summerTime) {
    if (actualHour >= 19 && actualHour <= 23) {
      return true
    }
  } else {
    if (actualHour >= 21 && actualHour <= 23) {
      return true
    }
  }
}

export const ActualHourCountry = (countryCode: string): number => {
  // local Date transform to specific country hour

  const country = countryTimeZone.getCountry(countryCode)

  const date = new Date()

  const dateHour = new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: country.timezones[0]
    })
  )

  const hour = dateHour.getHours()

  return hour === 0 ? hour : hour
}

export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const c = console.log.bind(document)
