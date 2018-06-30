import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
 apiKey: 'ae57d02ea6444c9299385ee9cae514c7'
});

const particleOptions = {
               particles: {
                 number: {
                   value:30,
                   density: {
                     enable: true,
                     value_area: 800,
                   }
                 },
                 line_linked: {
                   shadow: {
                     enable: true,
                     color: "#3CA9D1",
                     blur: 5
                   }
                 }
               }
             }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

calculateFaceLocation = (data) => {
 const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
 const image = document.getElementById('inputImage');
 const width = Number(image.width);
 const height = Number(image.height);
 console.log(width, height);
}
  onInputChange = (event) => {
   this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
             params={particleOptions}
           />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
        onInputChange = {this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
