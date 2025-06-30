import React, {FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacters } from '../api'
import { CharactersResponse } from '../types'
import { CharacterTable } from '../components/CharacterTable'

export const CharacterListPage: FC = () => {
  const [page, setPage] = useState(1)

  const { data, isPending, error } = useQuery<CharactersResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    placeholderData: (prev) => prev,
  })

  if (isPending) return <p>Loading characters...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Rick & Morty Characters</h1>

      {data && <CharacterTable characters={data.results} />}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => (data?.info.next ? p + 1 : p))}
          disabled={!data?.info.next}
          style={{ marginLeft: 8 }}
        >
          Next
        </button>

        <span style={{ marginLeft: 16 }}>
          Page {page} of {data?.info.pages}
        </span>
      </div>
    </div>
  )
}