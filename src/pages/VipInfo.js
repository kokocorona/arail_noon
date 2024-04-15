import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function VipInfo() {
  const [info,setInfo] = useState({});
  const params = useParams();
  const [load,setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  },[params])

  const doApi = async() => {
    const url = "http://fs1.co.il/bus/vip_big.php";
    try {
      setLoad(true)
      // עם הצגת הטעינה גם יסתיר 
      // את המידע שהיה קיים לפני על אותו אדם
      setInfo({});
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      const item = data.find(item => item.rank == params["rank"])
      setInfo(item)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }





  return (
    <div className='container'>
       {load && <h3>Loading...</h3>}
      {/* לבדוק אם למשתנה אינפו קיים פרופ כלשהו
      שמרמז שכל המאפיינים נטענו ואז להציג את המידע כדי לא לקבל
      פאטל אירור */}
      { info.name &&
      <article>
        <h2>Info about: {info.personName}</h2>
        <img src={info.person.squareImage} className='col-4' alt="vip" />
        <div>Companies: {info.source}</div>
        <div>Bio: {info.bios[0]}</div>
        <Link to="/vip">Back to list</Link>
        <br/>
        {
          params["rank"] < 10 && 
        <button onClick={() => {
          nav(`/vip/${Number(params["rank"]) + 1}`)
        }}>Next</button> }
      </article>
      }
    </div>
  )
}
