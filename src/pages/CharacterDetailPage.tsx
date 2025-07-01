import React from 'react'
import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Character } from '../types'
import { fetchCharacter } from '../api'

export const CharacterDetailPage: React.FC = () => {
  const { id } = useParams({ strict: false }) as { id: string }
  const { data, isPending, error } = useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
    staleTime: 0,
      gcTime: 0,
  })

  if (isPending) return <p>Loading character...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No character found.</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} width={200} />
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Species:</strong> {data.species}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
    </div>
  )
}
