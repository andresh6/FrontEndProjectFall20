import React, { Component } from 'react';
import {Bar, Doughnut} from 'react-chartjs-2';


export default class homepage extends Component {

  // state = {
  //     labels: null,
  //     datasets: null,
  // }

  componentDidMount(){

    const url = 'https://swapi.dev/api/people/';

    //async function that gets page info from api
    async function loadResponse(url) {
        let response = await fetch(url);
        if (response.status == 200) {
            let this_page = await response.json();
            return this_page;
        }
        throw new Error(response.status);
    }
    
    //gets eye color for all characters in object
    async function get_all_info(){
        let next_url = url;
        let all_eye_color = {};
        do {
            await loadResponse(next_url).then((data) => {
            data.results.map(x => {   
    
            if(!all_eye_color.hasOwnProperty(x.eye_color)){
              all_eye_color[x.eye_color] = 0;
            }
            all_eye_color[x.eye_color] = all_eye_color[x.eye_color] + 1;
    
            });
    
            next_url = data.next;
            }) 
        } while(next_url !== null);
        return all_eye_color;
    }
    
    //for colors that contain a ',' or a '-', assign a random color to represent it.
    function get_colors(all_eye_info){
        let colors = Object.keys(all_eye_info);
        for(let i = 0; i < Object.keys(all_eye_info).length; i++){
          if(colors[i].includes(',')||colors[i].includes('-')){
            let random_color = [0,0,0];
            let rc = random_color.map(x => Math.floor(Math.random() * 255));
            colors[i] = `rgb(${rc[0]}, ${rc[1]}, ${rc[2]})`;
          }
        }
        return colors;
    }
    
    get_all_info().then((eye_color_data) => {

      this.setState({
        labels: Object.keys(eye_color_data),
        datasets: [{
          data: Object.values(eye_color_data),
          backgroundColor: 
          get_colors(eye_color_data),
          borderWidth: 0,
        }],
      })

    });
}

  render() {
    return (
      <div>
          <h1 id="results">
            NBA Dashboard
          </h1>
          <Doughnut
            data={this.state}
            options={{
              scales: {
                  yAxes: [{
                    display: false,
                  }]
              },
              legend: {
                position: 'bottom'
              }
            }}
          />        
      </div>
    );
  }
}