import React, { Component } from 'react';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecogtion from './Components/FaceRecogtion/FaceRecogtion';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number:{ value:80, density:{ enable:true, value_area:800} },
    size: { value: 10, random: true, anim: { enable: true, speed: 20, size_min: 0.1, sync: false } }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  faceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }
  displayFaceBoxes = (boxes) => {
    this.setState({boxes : boxes});
  }

  onInputChange = (event) => {
   this.setState({input:event.target.value});
 }

 onSubmit = () => {
  this.setState({imageUrl : this.state.input});
   fetch('https://face-box-server.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          input: this.state.input
        })
      })
   .then(response => response.json())
  .then(response => {
    if(response){
      fetch('https://face-box-server.herokuapp.com/image',{
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
       this.setState(Object.assign(this.state.user, {entries:count}))
      })
      .catch(console.log);
    }
      this.displayFaceBoxes(this.faceLocations(response))
  })
  .catch(err => console.log('err'));
}

onRoutechange = (route) => {
  if (route === 'signout'){
    this.setState(initialState)
  }else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

render() {
 const {isSignedIn, imageUrl, route, boxes} = this.state;
  return (
    <div className="App">
    <Particles className='particles'
    params={particlesOptions} />
    <Navigation isSignedIn={isSignedIn} onRoutechange={this.onRoutechange}/>
    { route === 'home'
    ? <div>
         <Logo/>
         <Rank name={this.state.user.name} entries={this.state.user.entries}/>
         <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
         <FaceRecogtion boxes={boxes} imageUrl={imageUrl}/>
      </div>
    : ( route === 'signin'
        ?  <SignIn loadUser={this.loadUser} onRoutechange={this.onRoutechange} />
        : ( route === 'signout'
        	? <SignIn loadUser={this.loadUser} onRoutechange={this.onRoutechange} />
        	: <Register loadUser={this.loadUser} onRoutechange={this.onRoutechange}/>
        )
      )
    }
  </div>
  );
}
}

export default App;