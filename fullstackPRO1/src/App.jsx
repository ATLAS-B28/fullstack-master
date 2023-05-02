import { Route ,Routes} from 'react-router-dom'

import './App.css'
import DefaultHOC from './HOC/Default.HOC'
import MovieHOC from './HOC/Movie.HOC'
import Temp from './Components/temp'
function App() {
  

  return (
    <>
       <DefaultHOC path="/" exact component={Temp} />
    </>
  )
}
//this is home route and movie route
export default App
