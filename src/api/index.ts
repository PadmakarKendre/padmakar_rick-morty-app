import { CharactersResponse } from "../types"

export const fetchCharacters = async (page: number): Promise<CharactersResponse> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}
