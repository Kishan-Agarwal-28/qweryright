import { useQuery } from '@tanstack/react-query'
import { searchLocations, type Location } from '@/lib/api/location'
import { useMemo } from 'react'

export const useLocationSearch = (searchTerm: string) => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['locations', searchTerm],
    queryFn: () =>
      searchLocations({
        city: searchTerm,
      }),
    enabled: searchTerm.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const options = useMemo(
    () =>
      data.map((location) => ({
        value: `${location.city}-${location.state}-${location.country}`,
        label: `${location.city}, ${location.state}, ${location.country}`,
      })),
    [data],
  )

  return {
    options,
    isLoading,
    error,
    rawData: data,
  }
}
