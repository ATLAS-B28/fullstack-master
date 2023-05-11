import './App.css';
import HomeLayoutHOC from './HOC/home.HOC.js';
import Temp from './Components/temp.js';
function App() {
  return (
    <>
     <HomeLayoutHOC path="/" exact component={Temp} />
    </>
  );
}

export default App;
