import React from 'react'
import { Link } from 'react-router-dom'

const ConnectsPage = () => (
    <section>
      <h1>Connects</h1>
  
      <Link to="/dataList" className="button">
        View Data
      </Link>
    </section>
  )
  
  export default ConnectsPage