import axios from "axios";
import React, { useEffect, useState } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);
 const getplayers = async()=> {
    try {
      let res = await axios.get("http://localhost:4000/allplayer");
      setPlayers(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    getplayers()
  }, []);

  const [name, setName] = useState('');
    const [runs, setRuns] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit =async (e) => {
        e.preventDefault();
      let payload = {
            "name":name,
            "runs":runs,
            "position":position
          }
       
          try {
            let res =await axios.post("http://localhost:4000/createnew",payload,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
console.log(res?.data?.success,"fnje");
if(res?.data?.success === true){
    getplayers()
}
          } catch (error) {
            
          }
    };

  return (
    <>
      <div className="players">
      <form className="player-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter player name"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="runs">Runs</label>
                <input
                    type="number"
                    id="runs"
                    value={runs}
                    onChange={(e) => setRuns(e.target.value)}
                    className="form-control"
                    placeholder="Enter runs scored"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="position">Position</label>
                <input  
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="form-control"
                    placeholder="Enter player position"
                    required
                />
            </div>
            <button type="submit" className="button">Add Player</button>
        </form>
        <table class="table table-responsive" style={{maxHeight:"400px", overflowY:'auto'}}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Runs</th>
              <th scope="col">Postions</th>
            </tr>
          </thead>
          <tbody>
            {players?.map((e, i) => (
              <tr>
                <td>
                  <span>{e?.name}</span>
                </td>
                <td>{e?.runs}</td>
                <td>{e?.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Players;
