import React from 'react'
import { useParams } from 'react-router-dom'

function Detail() {
    let param = useParams();
  return (
    <div>
        {param.category} / 
        {param.id}
    </div>
  )
}

export default Detail