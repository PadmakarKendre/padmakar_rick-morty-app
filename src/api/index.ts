import { CharactersResponse, Character } from "../types"

export const fetchCharacters = async (page: number): Promise<CharactersResponse> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export const fetchCharacter = async (id: string): Promise<Character> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, { cache: 'reload' })
  if (!res.ok) throw new Error('Network error')
  return res.json()
}
