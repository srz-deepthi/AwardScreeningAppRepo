import { BrowserRouter, Route ,Routes, Link } from 'react-router-dom'
import Cards from "./components/cards"
import User from "./components/userDetails"
function App() {

  const data = {
    "documents": [
      {
        "Id": 1,
        "AwardCategory": "Best Actor",
        "Nominees": 
        [ 
          "Will Smith",
          "Javier Bardem",
          "Benedict Cumberbatch",
          "Andrew Garfield"
        ]        
      },
      {
        "Id": 2,
        "AwardCategory": "Best Director",
        "Nominees": [
              "Jane Campion",
              "Kenneth Branagh",
              "Ryusuke Hamaguchi",
              "Paul Thomas Anderson"
        ]
      },
      {
        "Id": 3,
        "AwardCategory": "Best Movie",
        "Nominees": [
              "KING RICHARD",
              "CODA",
              "DON'T LOOK UP",
              "BELFAST"
        ]
      }
    ]
  }
  return (
    <div>
        {/* <AwardCategories/>  */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Cards data = {data.documents}/>}/>
            <Route path="/user" element={ <User/> }/>
          </Routes>
        </BrowserRouter>
               
    </div>
  );
}

export default App;
