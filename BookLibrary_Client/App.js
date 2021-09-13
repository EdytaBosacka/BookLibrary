import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import Books from './pages/Books';
import SearchByISBN from './pages/SearchByISBN';
import {
  Route,
  Switch
} from "react-router-dom";

function App() {
  return (
    <div className="App">
				<SideBar />
				<Switch>
					<Route path='/books' component={Books} />
					<Route path='/isbn' component={SearchByISBN} />
				</Switch>
	</div>
  );
}

export default App;
