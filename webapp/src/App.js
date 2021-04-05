import './App.css';
import {HeadingL, HeadingS, HeadingXS,BodyNormal, BodyS, BodyL} from "./components/Typography/Typographies"
function App() {
  return (
    <div className="App">
      <HeadingL>Your Incubators</HeadingL>
      <HeadingS>Your Incubators</HeadingS>
      <HeadingXS>Temperature</HeadingXS>
      <BodyNormal>Preset: Chicken</BodyNormal>
      <BodyS>33°C</BodyS>
      <BodyL>33°C</BodyL>

    </div>
  );
}

export default App;
