const incrementAction = {
  type: 'INCREMENT'
}

const decrementAction = {
  type: 'DECREMENT'
}

export default function WeatherReducer(state: any = 0, { type, payload }: any) {
  switch (type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0

    default:
      return state
  }
}
