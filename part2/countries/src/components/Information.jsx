import React from 'react'

const Information = ({ countries }) => {

  return (
    <>
        {
            countries.length > 10 ? 
            <p>Too many matches, keep typing</p> :
            countries.length > 1 && countries.length <= 10 ? 
                <div>
                    {
                        countries.map(c => <p key={c.tld}>{c.name.common}</p>)
                    }
                </div> : 
                <div>
                    <h2>{ countries[0].name.common }</h2>
                    <p>capital { countries[0].capital }</p>
                    <p>area { countries[0].area }</p>
                    <img src={ countries[0].flags.png } alt="" />
                </div>
        }        
    </>
  )
}

export default Information
