import { useQuery } from '@tanstack/react-query'
import { searchInstitutions, type Institution } from '@/lib/api/institution'
import { useMemo } from 'react'

export const useInstitutionSearch = (searchTerm: string) => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['institutions', searchTerm],
    queryFn: () =>
      searchInstitutions({
        name: searchTerm,
        limit: 20,
      }),
    enabled: searchTerm.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const options = useMemo(
    () =>
      data.map((institution) => ({
        value: institution.id.toString(),
        label: institution.name,
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
