
import axios from 'axios'
import './App.css'
import Tarjeta from './components/Tarjeta'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'

function App() {
  const [dark, setDark] = useState(true)
  const [icon_dark, setIcon_dark] = useState(<i className='bx bxs-toggle-left'></i>)
  const [input, setInput] = useState('')
  const [datas, setDatas] = useState({})
  const [loader, setLoader] = useState(true)
  const [confir, setConfir] = useState(false)

  const event_dark = () =>{
    setDark(!dark)
    if (dark) {
      setIcon_dark(<i className='bx bxs-toggle-right' ></i>)
    } else {
      setIcon_dark(<i className='bx bxs-toggle-left'></i>)
    }
  }

  setTimeout(() => {
    setLoader(false)
  }, 2000);

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=79d3bdc6b53d4af133740dcb82431d13&lang=es`)
    .then(resp => {
      setDatas(resp.data)
    })
    .catch(error => console.error(error))
  }, [input])

  return (
    
    <div className={`body ${dark ? '' : 'body-dark'}`}>
      {loader && <Loader />}
      <div className='header'>
      <div className='container-title'><h1 className='title'>Weather app</h1></div>
      <div className='container-input'>
        <form className='container-seach'
          onSubmit={ev => {
            ev.preventDefault()
            setInput(ev.target.input.value)
          }}
        >
          <input placeholder='Busca una ciudad' type="text" name='input' autoComplete='off' className={`look-for ${dark ? '' : 'look-for-dark'}`}/>
          <button className='seach' type='submit' onClick={() => setConfir(true)}>🔍</button>
        </form>
      </div>
      <div className="container-dark"><button onClick={event_dark} className='dark'>{icon_dark}</button></div>
      </div>

      <Tarjeta
      datas={datas}
      dark={dark}
      confir={confir}
      />
      
    </div>

  )
}

export default App