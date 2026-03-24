import "./App.css";
// import DogBreedQuiz from './components/DogBreedQuiz';
// import DogMoodTracker from './components/DogMoodTracker';
// import { MarqueeDemo } from './components/Marquee';
// import Navbar from './components/Navbar';
import Router from "./components/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <DogBreedQuiz/> */}
      {/* <DogMoodTracker/> */}
      <Router />
      {/* <MarqueeDemo/> */}
    </BrowserRouter>
  );
}

export default App;
