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
  'https://pikwizard.com/photos/sky-clouds-cloud--e64049d0bcbd344f58218af50c4aac56-m.jpg'
const cloudlyNight =
  'https://img.freepik.com/fotos-premium/luna-llena-detras-nubes_469558-18412.jpg?w=1800'
const rainDay =
  'https://img.freepik.com/foto-gratis/lluvia-fuera-ventanas-villa_1321-908.jpg?w=2000&t=st=1666987282~exp=1666987882~hmac=ca54619c2b1d7c78a25d5fd0520ff08a2e3a40cbad6326616734721e6bcce631'
const rainNight =
  'https://img.freepik.com/foto-gratis/gotas-lluvia-ventana_1339-7321.jpg?w=2000&t=st=1666988402~exp=1666989002~hmac=c13fda53e6c1055bebd235b5dc8330f1a4eb09aa493f4fdcfacb1084cb9be413'
const clearDay =
  'https://img.freepik.com/foto-gratis/magnifica-vista-carretera-fin-cielo-azul-claro_181624-8968.jpg?w=2000&t=st=1669472288~exp=1669472888~hmac=a5e8e5865eadf39f30ad27e8ca35c616b3cecae24d53ea5b1055a80795636ce7'
const clearNight =
  'https://img.freepik.com/foto-gratis/hermosa-foto-primer-plano-extremo-media-luna_181624-4157.jpg?w=2000&t=st=1666988698~exp=1666989298~hmac=3c2021da0db14c048f4bf06b2e0ffb100f9249de4e52d6df6391e201ed871f3a'
const fog =
  'https://img.freepik.com/fotos-premium/carretera-escenica-grandes-arboles-niebla-mistica-niebla-dia-otono_379823-3801.jpg?w=2000'
// 'https://img.freepik.com/foto-gratis/arboles-al-lado-otro-bosque-cubiertos-niebla-que-arrastra_181624-16397.jpg?w=2000&t=st=1666992163~exp=1666992763~hmac=cf4a90c60c0ffdf8aab95b11ceb2b1a67b07364c413a4669a9c29b624da29ef7'
const fogNight =
  'https://img.freepik.com/fotos-premium/siluetas-arboles-oscuros-bosque-espeluznante-niebla-nocturna-resplandor-misterioso-ilustracion-digital-3d_124717-1601.jpg?w=2000'
// 'https://img.freepik.com/fotos-premium/luna-llena-sobre-nubes-niebla-cielo-nocturno-nebuloso-paisaje-borroso_284753-2035.jpg?w=2000'

const storm =
  'https://img.freepik.com/fotos-premium/supercell-tormenta-tormenta-tornado-advertencia-tiempo-concepto_492154-1421.jpg?w=2000'

const stormNight =
  'https://img.freepik.com/foto-gratis/nubes-tormenta-relampagos-noche_335224-937.jpg?w=2000&t=st=1666992481~exp=1666993081~hmac=26b0340d37e91d532ba6e143df52b68e88759afd78e9f02554858ae908fa0f0f'

const snow =
  'https://img.freepik.com/foto-gratis/paisaje-carretera-selva-negra-cubierta-arboles-nieve-alemania_181624-54214.jpg?w=2000&t=st=1671226661~exp=1671227261~hmac=3a4300d4b4508a02e1b44d16000b7fb952fb31eb039f69a3bc69ae7b3123078f'
const snowNight =
  'https://img.freepik.com/foto-gratis/hermosa-foto-montana-cubierta-nieve-noche_181624-4160.jpg?w=2000&t=st=1671226715~exp=1671227315~hmac=07e2509ab232069dbb0679992c1ee72ae66ba5d0736e630ead3e9b5bb7b09f51'

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
  return ''
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
