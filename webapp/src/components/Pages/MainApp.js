import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import IncubatorList from "../../components/Views/IncubatorList";
import Profile from "../../components/Views/Profile";
import SetupIncubator from "../../components/Views/SetupIncubator";
import spinner from "../../loading.gif";
import styled from "styled-components";

const StyledSpinner = styled.img`
	width: 48px;
	height: 48px;
	margin: auto;
`;
const MainApp = () => {
	const authContext = useContext(AuthContext);
	const { authLoading, currentUser, incubators } = authContext;
	const [view, setView] = useState({
		id: "DEVICELIST",
		title: "Your Incubators",
		el: <IncubatorList btnFunc={() => toSetupnewIncubator(id)} />,
		backBtn: false,
	});
	const { el, title, backBtn, id } = view;
	const back = () => {
		setView({
			id: "DEVICELIST",
			title: "Your Incubators",
			mainBtnText: "Set Up a New Incubator",
			el: <IncubatorList btnFunc={() => toSetupnewIncubator(id)} />,
			backBtn: false,
		});
	};
	const toProfile = () => {
		setView({
			id: "PROFILE",
			title: currentUser.email,
			el: <Profile />,
			mainBtnText: "",
			backBtn: true,
		});
	};
	const toSetupnewIncubator = () => {
		setView({
			id: "SETUPNEW",
			title: "New Incubator",
			el: <SetupIncubator />,
			mainBtnText: "Set Up Incubator",
			backBtn: true,
		});
	};

	return (
		<>
			{authLoading ? (
				<StyledSpinner src={spinner} alt="Loading" />
			) : (
				<>
					{currentUser === null ? (
						<>
							<Redirect to="/sign-in" />
						</>
					) : (
						<div className="d-flex flex-column w-100">
							<Header
								title={title}
								toProfile={toProfile}
								backBtn={backBtn}
								goBack={back}
							/>
							<div
								className={`d-flex flex-column w-100 ${
									id === "DEVICELIST" && incubators.length === 0
										? `m-auto`
										: `mt-4`
								}`}
							>
								{el}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default MainApp;
