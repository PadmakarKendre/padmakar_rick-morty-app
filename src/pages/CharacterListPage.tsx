import React, { FC, useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCharacters } from '../api'
import { CharactersResponse } from '../types'
import { CharacterTable } from '../components/CharacterTable'
import { useNavigate, useSearch } from '@tanstack/react-router'

type CharacterListSearch = {
  page?: number
}

export const CharacterListPage: FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as CharacterListSearch;
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  const page = search.page || 1;

  const { data, isPending, error, refetch } = useQuery<CharactersResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
  })

  useEffect(() => {
    if (data) setLastRefreshed(new Date());
  }, [data]);

  if (isPending) return <p>Loading characters...</p>
  if (error) return <p>Error: {error.message}</p>

  const setPage = (p: number) => {
    navigate({ to: '/', search: { page: p } })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Rick & Morty Characters</h1>

      {data && <CharacterTable characters={data.results} />}

      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        {data && Array.from({ length: data.info.pages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            disabled={num === page}
            style={{
              margin: '0 2px',
              fontWeight: num === page ? 'bold' : 'normal',
              backgroundColor: num === page ? '#1976d2' : '',
              color: num === page ? '#fff' : '',
              border: num === page ? '2px solid #1976d2' : '',
              borderRadius: '4px',
              minWidth: '32px',
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage(data?.info.next ? page + 1 : page)}
          disabled={!data?.info.next}
          style={{ marginLeft: 8 }}
        >
          Next
        </button>

        <span style={{ marginLeft: 16 }}>
          Page {page} of {data?.info.pages}
        </span>

        {/* Refresh Button */}
        <button
          onClick={async () => {
            await refetch();
            setLastRefreshed(new Date());
          }}
          style={{ margin: 16, backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 12px' }}
        >
          Refresh
        </button>
        {lastRefreshed && (
          <span style={{ marginLeft: 16, color: '#888' }}>
            Last Refreshed: {lastRefreshed.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  )
}