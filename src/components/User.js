import React from 'react'

const User = props => {
  console.log(props)
  return(
    <div>
      <h1>Perfil de {props.match.params.userName}</h1>
    </div>
  )
}

export default User
