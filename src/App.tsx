import './App.css';
import Home from "./components/Home/Index";
import Title from './components/Title/Index';

const App = () => {

  return (
    <div className="max-w-3xl">
      <Title />
      <Home />
    </div>
  );
};

export default App;
