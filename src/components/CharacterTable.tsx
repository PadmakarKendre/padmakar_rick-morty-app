import React, { FC } from 'react'
import { Character } from '../types'

type CharacterTable = {
  characters: Character[]
}

export const CharacterTable: FC<CharacterTable> = ({ characters }) =>
(
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
        <tr key={char.id}>
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
