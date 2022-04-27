import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './redux/store'
import ListAwards from "./components/listAwards"
import Vote from "./components/Vote"
import Timer from "./components/timer"
import Winners from "./components/winners"
import { useState } from "react"

function App() {

  const [time,setTime]=useState();

  const checkTime = (tme) =>{
    // alert(tme)
    // console.log("date",new Date().getTime() - tme)
    setTime(tme)
  }
  return (
    <Provider store={Store}>
        <Timer checkTime={checkTime}/>
        <BrowserRouter>
        <Routes>
             {  time > new Date().getTime() ? 
              <> 
                
                  <Route path="/" element={<ListAwards/>}/>
                  <Route path="/vote" element={ <Vote/> }/> 
                  <Route path="/win" element={ <Winners/>} />
              </>:
              <>            
                  <Route path="/" element={ <Winners/>} />
              </>
             }
        </Routes>
        </BrowserRouter>
    </Provider>         
  );
}

export default App;
