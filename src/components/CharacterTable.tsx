import React, { FC } from 'react'
import { Character } from '../types'
import { useNavigate } from '@tanstack/react-router'

type CharacterTable = {
  characters: Character[]
}

export const CharacterTable: FC<CharacterTable> = ({ characters }) => {
  const navigate = useNavigate();
  return (
    <table style={{ width: '100%', marginLeft: "20px", borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((char) => (
          <tr key={char.id} style={{ cursor: 'pointer' }} onClick={() => navigate({ to: '/character/$id', params: { id: String(char.id) } })}>
            <td>
              <img src={char.image} alt={char.name} width={50} />
            </td>
            <td>{char.name}</td>
            <td>{char.status}</td>
            <td>{char.species}</td>
            <td>{char.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
