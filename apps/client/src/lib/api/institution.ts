import axios from 'axios'

const INSTITUTION_API_BASE = 'https://utils.koyeb.app/institutions'

export interface Institution {
  id: number
  name: string
  state: string
}

export interface InstitutionSearchParams {
  name: string
  limit?: number
}

export const searchInstitutions = async (
  params: InstitutionSearchParams,
): Promise<Institution[]> => {
  if (!params.name || params.name.length < 2) {
    return []
  }

  const { data } = await axios.get<Institution[]>(
    `${INSTITUTION_API_BASE}/api/institutions`,
    {
      params: {
        name: params.name,
        limit: params.limit || 20,
      },
    },
  )

  return data
}
