// import { WebSocketDemo } from './components/Websocket'
// import { WSClient } from "./components/WSClient"
import {NOAAPollingFeed} from "./components/NOAAPollingFeed"
import { CaricoolsPollingWaves } from "./components/CaricoosApi"
import './App.css'

function App() {
  return (
    <>
      <div>
        {/* <WebSocketDemo/> */}
        {/* <WSClient/> */}
        <CaricoolsPollingWaves/>
        <NOAAPollingFeed/>
      </div>
    </>
  )
}

export default App