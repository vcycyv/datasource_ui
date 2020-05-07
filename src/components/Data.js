import React from 'react'

export const Data = ({ data }) => (
  <article className="data-excerpt">
    <h2>{data.Name}</h2>
    <p>{data.Type}</p>
  </article>
)