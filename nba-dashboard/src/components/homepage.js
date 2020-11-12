import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
require("dotenv").config();



export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: {},
    }
  }
  

  componentDidMount(){

    // const url = 'https://free-nba.p.rapidapi.com/teams/25';
    const url = 'https://api-nba-v1.p.rapidapi.com/teams/league/standard';

    //async function that gets page info from api
    let loadResponse = async () => {
        let response = await fetch(url, 
          {"method": "GET",
           "headers":
           {
            "x-rapidapi-host": process.env.REACT_APP_NONFREE_API_URL,
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            }
          }).then(response=>response.json())
            .then(json=>{
            console.log(json);
            this.setState({data: json, isLoaded: true})
          }).catch(err=>{
            console.log(err);
          })
    }

    loadResponse();
}

  load_data = () => {

    return Object.keys(this.state.data.api.teams).map((obj, i) => {
      if(this.state.data.api.teams[obj].allStar === "0" && this.state.data.api.teams[obj].leagues.standard.divName !== ""){
        return (
            <div key={obj}>
                <p>id is: {this.state.data.api.teams[obj].teamId}</p>
                <p>name is: {this.state.data.api.teams[obj].fullName}</p>
            </div>
        )
      }
    })

  }


  render() {
    if(!this.state.isLoaded){
      return (
        <div>
            <h1>
              Loading...
            </h1>
        </div>
      )
    }

    return (
      <div>
          <h1>
            NBA Dashboard
          </h1>
          
          {this.load_data(this.state.data)}

      </div>
    );
  }
}