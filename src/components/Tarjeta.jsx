import { useState ,useEffect } from "react"
import axios from "axios"
 
const Tarjeta = ({datas, dark, setDark, confir}) => {
  
  const [celsius,setCelsius] = useState(0)
  const [fahrenheit, setFahrenheit] =useState(0)
  const [symbol, setSymbol] = useState('F°')
  const [data, setData] = useState({})
  const [convert, setConvert] = useState(false)

  const apiKey = '79d3bdc6b53d4af133740dcb82431d13'
  
  const isoCountries = {
    AF: "Afganistán",AX: "Islas Aland",AL: "Albania", DZ: "Algeria",AS: "Samoa Americana",AD: "Andorra",AO: "Angola",AI: "Anguila",AQ: "Antártida",AG: "Antigua y Barbuda",AR: "Argentina",AM: "Armenia",AW: "Aruba",AU: "Australia",AT: "Austria",AZ: "Azerbaiyán",BS: "Bahamas",BH: "Baréin",BD: "Bangladesh",BB: "Barbados",BY: "Bielorrusia",BE: "Bélgica",BZ: "Belice",BJ: "Benín",BM: "Bermudas",BT: "Bután",BO: "Bolivia",BA: "Bosnia Herzegovina",BW: "Botswana",BV: "Isla Bouvet",BR: "Brasil",IO: "Territorio Británico del Océano Índico",BN: "Brunéi",BG: "Bulgaria",BF: "Burkina Faso",BI: "Burundi",KH: "Camboya",CM: "Camerún",CA: "Canadá",CV: "Cabo Verde",KY: "Islas Cayman",CF: "Republica Centroafricana",TD: "Chad",CL: "Chile",CN: "China",CX: "Kiritimati",CC: "Islas Cocos",CO: "Colombia",KM: "Comoros",CG: "Congo",CD: "Republica Democratica del Congo",CK: "Islas Cook",CR: "Costa Rica",CI: "Costa de Marfil",HR: "Croacia",CU: "Cuba",CY: "Chipre",CZ: "República Checa",DK: "Dinamarca",DJ: "Yibuti",DM: "Dominica",DO: "República Dominicana",EC: "Ecuador",EG: "Egipto",SV: "El Salvador",GQ: "Guinea Equatorial",ER: "Eritrea",EE: "Estonia",ET: "Etiopía",FK: "Islas Malvinas",FO: "Islas Feroe",FJ: "Fiyi",FI: "Finlandia",FR: "Francia",GF: "Guayana Francesa",PF: "Polinesia Francesa",TF: "Territorios Franceses del sur",GA: "Gabón",GM: "Gambia",GE: "Georgia",DE: "Alemania",GH: "Ghana",GI: "Gibraltar",GR: "Grecia",GL: "Greenland",GD: "Granada",GP: "Guadalupe",GU: "Guam",GT: "Guatemala",GG: "Guernsey",GN: "Guinea",GW: "Guinea-Bissau",GY: "Guyana",HT: "Haití",HM: "Isla Heard e Islas Mcdonald",VA: "Ciudad del Vaticano",HN: "Honduras",HK: "Hong Kong",HU: "Hungría",IS: "Islandia",IN: "India",ID: "Indonesia",IR: "Irán",IQ: "Iraq",IE: "Irlanda",IM: "Isla de Man",IL: "Israel",IT: "Italia",JM: "Jamaica",JP: "Japón",JE: "Jersey",JO: "Jordania",KZ: "Kazajistán",KE: "Kenia",KI: "Kiribati",KR: "Korea",KW: "Kuwait",KG: "Kirguistán",LA: "Laos",LV: "Letonia",LB: "Líbano",LS: "Lesoto",LR: "Liberia",LY: "Libia",LI: "Liechtenstein",LT: "Lituania",LU: "Luxemburgo",MO: "Macao",MK: "Macedonia",MG: "Madagascar",MW: "Malaui",MY: "Malasia",MV: "Maldivas",ML: "Mali",MT: "Malta",MH: "Islas Marshall",MQ: "Martinica",MR: "Mauritania",MU: "Mauricio",YT: "Mayotte",MX: "México",FM: "Micronesia",MD: "Moldavia",MC: "Mónaco",MN: "Mongolia",ME: "Montenegro",MS: "Montserrat",MA: "Marruecos",MZ: "Mozambique",MM: "Myanmar (Birmania)",NA: "Namibia",NR: "Nauru",NP: "Nepal",NL: "Holanda",AN: "Antillas Holandesas",NC: "Nueva Caledonia",NZ: "Nueva Zelanda",NI: "Nicaragua",NE: "Níger",NG: "Nigeria",NU: "Niue",NF: "Isla Norfolk",MP: "Islas Marianas del Norte",NO: "Noruega",OM: "Omán",PK: "Pakistán",PW: "Palau",PS: "Palestina",PA: "Panamá",PG: "Papua Nueva Guinea",PY: "Paraguay",PE: "Perú",PH: "Filipinas",PN: "Islas Pitcairn",PL: "Polonia",PT: "Portugal",PR: "Puerto Rico",QA: "Qatar",RE: "Reunión",RO: "Rumanía",RU: "Rusia",RW: "Ruanda",BL: "San Bartolomé",SH: "Santa Helena",KN: "San Cristóbal y Nieves",LC: "Santa Lucía",MF: "San Martín",PM: "San Pedro y Miquelón",VC: "San Vicente y las Granadinas",WS: "Samoa",SM: "San Marino",ST: "Santo Tomé y Príncipe",SA: "Arabia Saudita",SN: "Senegal",RS: "Serbia",SC: "Seychelles",SL: "Sierra Leona",SG: "Singapur",SK: "Eslovaquia",SI: "Eslovenia",SB: "Islas Salomón",SO: "Somalia",ZA: "Sur África",GS: "Islas Georgias del Sur y Sandwich del Sur",ES: "España",LK: "Sri Lanka",SD: "Sudán",SR: "Surinam",SJ: "Svalbard y Jan Mayen",SZ: "Esuatini",SE: "Suecia",CH: "Suiza",SY: "Siria",TW: "Taiwán",TJ: "Tayikistán",TZ: "Tanzania",TH: "Tailandia",TL: "Timor Oriental",TG: "Togo",TK: "Tokelau",TO: "Tonga",TT: "Trinidad y Tobago",TN: "Túnez",TR: "Turquia",TM: "Turkmenistán",TC: "Islas Turcas y Caicos",TV: "Tuvalu",UG: "Uganda",UA: "Ucraina",AE: "Emiratos Árabes Unidos",GB: "Reino Unido",US: "Estados Unidos",UM: "Islas Ultramarinas Menores de Estados Unidos",UY: "Uruguay",UZ: "Uzbekistán",VU: "Vanuatu",VE: "Venezuela",VN: "Vietnam",VG: "Islas Vírgenes Británicas",VI: "Islas Vírgenes de los Estados Unidos",WF: "Wallis y Futuna",EH: "Sahara Occidental",YE: "Yemen",ZM: "Zambia",ZW: "Zimbabue"
  };
  
  function getCountryName(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
    } else {
      return countryCode;
    }
  }  
    useEffect(() => {

      
      navigator.geolocation.getCurrentPosition((position) => {
    
        axios
         .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude || 0}&lon=${position.coords.longitude || 0}&appid=${apiKey}&lang=es`)
         .then(resp =>{
           setData(resp.data)
           const noc = resp.data.weather?.[0]?.icon
           if (noc.includes('n')) {
            setDark(false)
           }
           setCelsius((resp.data.main?.temp)-273.15)
           setFahrenheit((((resp.data.main.temp)-273.15) * 9/5) + 32)

           
         })
         .catch(error => console.error(error))   
       })


    }, [])

    const event_convert = () => {
      setConvert(!convert)

      if (convert) {
        setSymbol('F°')
      }else{
        setSymbol('C°')
      }
    }
    
    if (confir) {
      setTimeout(() => {
        setData(datas)
        setCelsius((data.main?.temp)-273.15)
        setFahrenheit((((data.main?.temp)-273.15) * 9/5) + 32)
      }, 100);
    }
   
    return(
        <div>
          <div className={`card ${dark ? '' : 'card-dark'}`}>
            <div className="temperatureNum">{`${convert ? Math.round(fahrenheit) : Math.round(celsius)}°`}</div>
            <div className="icon-temperature"></div>
            <div className="main-label">
              <div className="d"><span className="p">VIENTO:</span> <span >{data.wind?.speed} m/s</span></div>
              <div className="d"><span className="p">NUBES:</span> <span >{data.clouds?.all}%</span></div>
              <div className="d"><span className="p">PRESIÓN:</span> <span >{data.main?.pressure} hPa</span></div>
            </div>
            <div className="container-label">
                <div className="location"><span>{data.name},</span> <span>{getCountryName(data.sys?.country)}</span></div>
                <div className="description">{data.weather?.[0]?.description}</div>
            </div>
          </div>

          <div className="container-img"><img className="img-icon" src={`/iconos/${data.weather?.[0]?.icon}.svg`} alt="" /></div>

          <button onClick={event_convert} className={`btn-convert ${dark ? '' : 'btn-convert-dark'}`}>Cambiar a {symbol}</button>
        </div>
    )
}
export default Tarjeta