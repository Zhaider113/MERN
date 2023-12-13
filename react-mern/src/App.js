import logo from './logo.svg';
import {useCallback, useEffect} from 'react';
import './App.css';
import {getFirebaseToken} from './firebase';
function App() {
  const getToken = useCallback(async ()  => {
      console.log("get token", await getFirebaseToken())
  }, [getFirebaseToken])

  useEffect(() => {
      getToken()
  }, [getToken])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
