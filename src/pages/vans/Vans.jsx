import React from 'react'
import { Link, useSearchParams, useLoaderData } from 'react-router-dom'
import { getVans } from '../../../vanApi'

export async function loader(){
   return getVans()
}

export default function Vans() {

  const [searchParam, setParam] = useSearchParams()
  const[error, setError] = React.useState(null)

  const vans = useLoaderData()

  const typeFilter = searchParam.get('type')

  const displayedVans = typeFilter ? vans.filter((van) => van.type === typeFilter) : vans


  const vanElement = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
        <Link to={van.id} state= {{ search: searchParam.toString(), type: typeFilter }}>
          <img src={van.imageUrl} />
          <div className="van-info">
              <h3>{van.name}</h3>
              <p>${van.price}<span>/day</span></p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
  )) 

  function handleChange(key, value){
    setParam(prev => {
      if(value === null){
        prev.delete(key)
      }
      else{
        prev.set(key, value)
      }
      return prev
    })
  }



 if(error){
  return <h1>There was an error: {error.message}</h1>
 }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>

      <div className="van-list-filter-buttons">
        <button onClick={() => handleChange('type', 'simple')} className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`}>Simple</button>

        <button onClick={() => handleChange('type', 'luxury')} className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`}>Luxury</button>

        <button onClick={() => handleChange('type', 'rugged')} className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`}>Rugged</button>

        {typeFilter ? (<button onClick={() => handleChange('type', null)} 
        className='van-type clear-filters'>Clear all filters</button>) : null}
      </div>

      <div className="van-list">
        {vanElement}
      </div>
    </div>
  )
}
