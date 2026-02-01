import axios from 'axios'

const LOCATION_API_BASE = 'https://utils.koyeb.app/locations'

export interface Location {
  city: string
  state: string
  country: string
}

export interface LocationSearchParams {
  city?: string
  state?: string
  country?: string
}

export const searchLocations = async (
  params: LocationSearchParams,
): Promise<Location[]> => {
  if (!params.city && !params.state && !params.country) {
    return []
  }

  const { data } = await axios.get<Location[]>(
    `${LOCATION_API_BASE}/api/locations`,
    {
      params,
    },
  )

  return data
}
