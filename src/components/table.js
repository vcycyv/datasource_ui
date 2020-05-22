import React from 'react'
import { Link } from 'react-router-dom';

export const Table = ({ data, connectionId }) => (
  <article className="data-excerpt">
    <h2><Link to={"/connections/" + connectionId + "/dataList/" + data}>{data}</Link></h2>
  </article>
)