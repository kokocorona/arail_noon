import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Vip() {
  const [vip_ar,setVipAr] = useState([]);
  const [load,setLoad] = useState(false);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    const url = "http://fs1.co.il/bus/vip_big.php";
    try {
      // ידאג להציג טעינה
      setLoad(true)
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      setVipAr(data);
      setLoad(false)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <h1>List of VIP 111:</h1>
      {load && <h3>Loading...</h3>}
      <div className='row'>
        {vip_ar.map(item => {
          return (
            <div key={item.rank} className='col-md-6 border p-2'>
              <img src={item.person.squareImage} className='float-start me-2 w-25' />
              <h2>{item.personName}</h2>
              <div>Money: {item.finalWorth} M</div>
              <Link to={"/vip/"+item.rank}>More info </Link>
            </div>
          )
        })}        
      </div>
    </div>
  )
}
