// import Events from "./components/Events"
import Signin from "./components/Sign"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Events from "./components/Events";

function App() {

  return (
  //  <div>
  //   <Sign/>
  //   {/* <Events/> */}
  //  </div>
  <BrowserRouter>
  <Routes>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/events" element={<Events/>}/>
  </Routes>
  </BrowserRouter>
    
  )
}

export default App
