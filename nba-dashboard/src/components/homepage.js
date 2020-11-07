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

    const url = 'https://free-nba.p.rapidapi.com/teams/25';

    //async function that gets page info from api
    let loadResponse = async () => {
        let response = await fetch(url, 
          {"method": "GET",
           "headers":
           {
            "x-rapidapi-host": process.env.REACT_APP_API_URL,
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            }
          }).then(response=>response.json())
            .then(json=>{
            console.log(json);
            this.setState({data: json})
          }).catch(err=>{
            console.log(err);
          })
    }

    
    
    loadResponse();
    this.setState({isLoaded:true});
}

  load_data = () => {
      return (
          <div>
              <p>abbreviation: {this.state.data.abbreviation} </p>
              <p>city: {this.state.data.city}</p>
              <p>id is: {this.state.data.id}</p>
              <p>full_name is: {this.state.data.full_name}</p>
          </div>
      )
  }


  render() {
    if(!this.state.isLoaded){
      return (
        <div>
            <h1>
              NBA Dashboard
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