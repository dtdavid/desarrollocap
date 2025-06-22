import React from 'react'

const formatNumber = (num) => {
    if (typeof num!=="number"){
        console.error ("el argumento proporcionado no es un número, num");
        return"N/A"
    }
  return (
    num.toLocaleString ("es-ES")
  )
}

export default formatNumber