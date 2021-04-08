import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  HeadingL,
  HeadingS,
  HeadingXS,
  BodyNormal,
  BodyS,
  BodyL,
} from "./components/Typography/Typographies";
import {
  MainButton,
  BackButton,
  ButtonText,
  ButtonTextDanger,
} from "./components/Buttons/Buttons";

import { Input } from "./components/Forms/Input";
import { CardDevice } from "./components/Cards/CardDevice";
import { CardPreset } from "./components/Cards/CardPreset";

function App() {
  return (
    <div className="App">
      <HeadingL>Your Incubators</HeadingL>
      <HeadingS>Your Incubators</HeadingS>
      <HeadingXS>Temperature</HeadingXS>
      <BodyNormal>Preset: Chicken</BodyNormal>
      <BodyS>33°C</BodyS>
      <BodyL>33°C</BodyL>
      <MainButton>Add a New Incubator</MainButton>
      <BackButton onClick={() => alert("A")} />
      <ButtonText>Cancel</ButtonText>
      <ButtonTextDanger>Stop Incubator</ButtonTextDanger>
      <Input placeholder="37-39" />
      <CardDevice />
      <CardPreset />
    </div>
  );
}

export default App;
