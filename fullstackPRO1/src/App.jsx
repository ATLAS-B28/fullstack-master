import { Route ,Routes} from 'react-router-dom'

import './App.css'
import DefaultHOC from './HOC/Default.HOC'
import MovieHOC from './HOC/Movie.HOC'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<DefaultHOC/>} />
      <Route path='/movie' element={<MovieHOC/>} />
    </Routes>
    </>
  )
}
//this is home route and movie route
export default App
