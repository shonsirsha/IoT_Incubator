import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import MainApp from "./components/Pages/MainApp";
import AuthState from "./context/auth/AuthState";

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
import { CardCurrent } from "./components/Cards/CardCurrent";
const MobileContainer = styled.div`
	max-width: 768px;
	display: flex;
	position: relative;
	margin-left: auto;
	margin-right: auto;
	padding: 40px 24px;
	min-height: 100vh;
	padding-bottom: 116px;
`;

function App() {
	return (
		<div className="App">
			{/* <HeadingL>Your Incubators</HeadingL>
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
      <CardCurrent /> */}
			<AuthState>
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<MobileContainer>
							<Route path="/sign-in" exact component={Login} />
							<Route path="/app" exact component={MainApp} />
						</MobileContainer>
					</Switch>
				</Router>
			</AuthState>
		</div>
	);
}

export default App;
