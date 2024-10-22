import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const Homepage = () => {
  const [player, setPlayer] = useState([]);
  const [teamname, setTeamname] = useState("");
  const [options, setOptions] = useState([]);
  const [teams, setteams] = useState([]);
  const [teamlist, setteamlist] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedteam, setSelectedteams] = useState(null);

  const [getteam,setGetteam] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected); // Update state with the selected options
  };
  const handleChange1 = (selected) => {
    setSelectedteams(selected); // Update state with the selected options
  };

  useEffect(() => {
    (async function () {
      try {
        let res = await axios.get("http://localhost:4000/allplayer");
        let res1 = await axios.get("http://localhost:4000/allTeams");
        console.log(res, "res1");
        setPlayer(res?.data?.data);
        setteamlist(res1?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(selectedOptions, "options");
  useEffect(() => {
    if (player?.length > 0) {
      let options1 = player.map((e) => ({
        value: e._id,
        label: e?.name,
        runs: e?.runs,
      }));
      setOptions(options1);
    }
    if (teamlist?.length > 0) {
      let options1 = teamlist.map((e) => ({
        value: e._id,
        label: e?.name,
      }));
      setteams(options1);
    }
  }, [player, teamlist]);

  const handlesubmitteam = async () => {
    const payload = {
      name: teamname,
      players: selectedOptions.map((option) => ({
        playerId: option.value, // Change 'value' to 'playerId'
        playerName: option.label, // Change 'label' to 'playerName'
      })),
      totalPoints: selectedOptions.reduce((sum, option) => sum + option.runs, 0) 
    };
    let res = await axios.post("http://localhost:4000/createnewteam", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res, "nrjvhbr");
  };


  useEffect(()=>{
   
if(selectedteam){
    (async function(){
        console.log(selectedteam,"selectedteam");
        let res = await axios.get(`http://localhost:4000/findteam/${selectedteam.value}`);
        console.log(res?.data?.data,"rnjgvn");
        setGetteam(res?.data?.data)
    })()
}
  },[selectedteam])

  console.log(options,"rbnvjbbr");
  return (
    <>
      <div className="homepage form-container">
        <h3> Create New Team</h3>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Team Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setTeamname(e?.target?.value);
            }}
            value={teamname}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Chennai Super Kings "
          />
        </div>
        <label htmlFor="exampleFormControlInput1" className="form-label">
            Add Players
          </label>
        <div className="select-container">
          <Select
            options={options}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedOptions}
            onChange={handleChange}
          />
        </div>

        <button onClick={handlesubmitteam} className="button">
          Submit
        </button>
      </div>
      <label htmlFor="exampleFormControlInput1" className="form-label">
            Search by Team
          </label>
      <div className="getteams">
        <Select
          options={teams}
          components={animatedComponents}
          isMult
          value={selectedteam}
          onChange={handleChange1}
        />
      </div>
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">Team players, {"Total Team runs: " + getteam.totalPoints}</th>
            {/* <th scope="col">id</th> */}
            {/* <th scope="col">Total Points</th> */}
          </tr>
        </thead>
        <tbody>
            {
                getteam?.players?.map((e,i)=>{
                    return(
                        <tr key={i}>
                            <td>{e?.playerName}</td>
                            {/* <td>{e?.playerId}</td> */}
                            {/* <td>{getteam?.totalPoints}</td> */}
                        </tr>
                    )
                })
            }
          <tr>
          
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Homepage;
