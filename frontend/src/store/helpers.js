import axios from 'axios'

export function Axios(context) {
  return(
    axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${context.state.bearer}`
      }
    })
  )
}

export function adjustColor(col, amt) {
  col = col.split('#')[1]
  let num = parseInt(col,16)
  let r = (num >> 16) + amt
  if (r > 255) r = 255
  else if  (r < 0) r = 0
  let b = ((num >> 8) & 0x00FF) + amt
  if (b > 255) b = 255
  else if  (b < 0) b = 0
  let g = (num & 0x0000FF) + amt
  if (g > 255) g = 255
  else if (g < 0) g = 0
  return '#' + (g | (b << 8) | (r << 16)).toString(16)
}
