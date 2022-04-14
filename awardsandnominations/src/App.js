import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import Store from './redux/store'
import Cards from "./components/cards"
import Vote from "./components/Vote"

function App() {
  return (
    <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Cards/>}/>
            <Route path="/vote" element={ <Vote/> }/>
          </Routes>
        </BrowserRouter>
    </Provider>         
  );
}

export default App;
