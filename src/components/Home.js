import logo from './logo.svg';
import '../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ECE651 Group 2
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          UWGoDutch
        </a>
      </header>
    </div>
  );
}

export default Home;
