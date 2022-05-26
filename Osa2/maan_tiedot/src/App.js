import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'


const Render_multiple = (props) => {
  
  return (
    <li>{props.country.name.common} <button onClick={() => props.buttoni(props.country)}>Show</button></li>
  )
}


const Languages = ({language}) =>{
  
  return (
    <li>{language}</li>
  )
}

const RenderCountry = ({country}) => {
  return (
    <div>
      <h2>
        {country.name.common}
      </h2>
      
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h3>languages</h3>  
      
      <ul>
        {Object.values(country.languages).map(language =>
          <Languages key={language} language={language}/>
        )}
      </ul>

      <div>
        
        <img src={Object.values(country.flags)[0]} alt='flag'/>
      </div>

    </div>
  )
}

const Countries = (props) => {

  //if only one country matches the search criteria, show information of that country
  if (props.countries.length === 1){
    return (
      <div>
        <RenderCountry country={props.countries[0]} />
      </div>
    )
  }

  else if (props.countries.length <= 10){
    
    return (
      <div>
        <ul>
          {props.countries.map(info => 
          <Render_multiple key={info.name.common} country={info} buttoni={props.buttoni}/>
          )}
        </ul>
      </div>
    )
      
    
  }
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const Filter = (props) => {
  console.log(props.handleFilterChange)
  return (
    <div>
        find countries 
        <input 
          value={props.filter}
          onChange={props.handleFilterChange}
        />
      </div>
  )
}



const App = () => {

  const [ countries, setCountries] = useState([])
  const [ filter, setFilter] = useState('')
  
  //retrieve data of the countries from the API
  useEffect(() =>{
    axios.get('https://restcountries.com/v3.1/all').then(response => (
      setCountries(response.data)
      
    )
      )
  }, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const buttonFilterChange = (props) =>{
    setFilter(props.name)
  }

  //filter countries
  const filterItems = () => {

    return countries.filter(country => 
      country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  return (
    <div>
      
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <Countries countries={filterItems()} buttoni={buttonFilterChange} />
    </div>
  )

}

export default App