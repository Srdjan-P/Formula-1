<<<<<<< HEAD
export default function Races () {
=======
import axios from "axios";
import { useEffect, useState } from "react";


export default function AllRaces () {
    const [races, setRaces]= useState ([]);

    useEffect(()=>{
        getRaces();
    }, [])

    const getRaces=async() => {
        const url='http://ergast.com/api/f1/2013/results/1.json';

        const response=await axios.get(url);
        const data=response.data.MRData.RaceTable.Races
        setRaces(data);
        console.log(data);
        
    }





>>>>>>> 3ca349f83598cc7a0c6d9b72674e62dc0424d17d
    return (
        <div className="racers">

            <table>
                <thead> 
                    <th>
                      <p>All Races</p>
                    </th>
                      </thead>
                      <tbody>

        {races.map((racer)=>{
            return(
                <tr>
                  
                    <td>
                        {racer.season}
                    </td>
                    <td>
                        {racer.round}
                    </td>
                    {/* <td>
                        {racer.url}
                        </td> */}
                </tr>
            )
        })}
      </tbody>
        </table>
        </div>
    )
}