import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import Books from './pages/Books';
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
				</Switch>
	</div>
  );
}

export default App;
