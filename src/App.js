import React, {useState, Component, useContext, useEffect} from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Input } from 'semantic-ui-react'
import Leaflet from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet' 

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const UserContext = React.createContext('user');
const FriendMap = ({
  centre,
  friends
}) => {

  return (
    <Map style={{
      height: '100vh',
      width: '500px'
    }} center={centre} zoom={15}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        friends.map(f => {
          return (
            <Marker position={f}>
              <Popup>
                A pretty CSS3 popup. <br /> ARE YOU THO?.
              </Popup>
            </Marker>
          )
        })
      }
      
    </Map>
  )
}

const DashboardScreen = () => {

  const value = useContext(UserContext);

  const [mapCentre, setMapCentre] = useState([
    49.28,// lat,
    -123.12 // lng
  ])

  const [friends, setFriends] = useState([
        
  ])

  useEffect(() => {
    if (value.user === 'Nima') {
      setFriends([
        [
          49.28,// lat,
          -123.121 // lng
        ],
        [
          49.2802,// lat,
          -123.12 // lng
        ],
        [
          49.2803,// lat,
          -123.12 // lng
        ]
      ])
    } else if (value.user === 'Kanye') {
      setFriends([
        [
          49.28,// lat,
          -123.121 // lng
        ],
        [
          49.2802,// lat,
          -123.12 // lng
        ],
        [
          49.2805,// lat,
          -123.22 // lng
        ],
        [
          49.2817,// lat,
          -123.26 // lng
        ]

      ])

    }
  }, [])
  

  return (
<Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='push'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
      <Link to="/login">
        <Menu.Item as='a'>
          <Icon name='home' />
          Login
        </Menu.Item>
      </Link>

      <Link to="/">
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Dashboard
        </Menu.Item>
      </Link>

      <Link to="/about">
        <Menu.Item as='a'>
          <Icon name='camera' />
          About 
        </Menu.Item>
      </Link>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic style={{
        height: '100vh'
      }}>
       <FriendMap
        centre={mapCentre}
        friends={friends}
       /> 

      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>      
  )
}

const LoginScreen = () => {
  const contextValue = useContext(UserContext)
  // SET THE CURRENT USER AS....
  const setCurrentUser = (e, {value}) => {
    contextValue.setUser(value)
  }

  return (
    <div>
      <h1>LOG IN</h1>
      <Input onChange={setCurrentUser}>
      </Input>
      <Link to="/">Dashboard</Link>
    </div>
  )
}

const AboutScreen = () => {
  return (
    <div>
      <h1>ABOUT TrackUrFriendz!</h1>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState("Nima")

  return (
    <div>
      <UserContext.Provider value={{
        user,
        setUser 
      }}>
        <Router>
          <Route exact path="/about">
            <AboutScreen />
          </Route>

          <Route exact path="/login">
            <LoginScreen />
          </Route>

          <Route exact path="/">
            <DashboardScreen />
          </Route>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

// function App() {
//   // const screen = 'login' // 'about', 'dashboard'
//   const [screen, setScreen] = useState("login")
//   return (
//     <div>
//       {/* {
//         loggedIn ? <DashboardScreen /> : <LoginScreen /> 
//       } */}

//       {
//         screen === 'login' && <LoginScreen /> 
//       }
//       {
//         screen === 'dashboard' && <DashboardScreen /> 
//       }
//       {
//         screen === 'about' && <AboutScreen /> 
//       }

//       <button onClick={() => setScreen("dashboard")}>Dashboard</button>
//     </div>
//   );
// }

export default App;
