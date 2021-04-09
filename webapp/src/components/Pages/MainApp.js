import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import IncubatorList from "../../components/Views/IncubatorList";
import Profile from "../../components/Views/Profile";
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
		title: "Your Incubators",
		el: <IncubatorList />,
		backBtn: false,
	});
	const { el, title, backBtn } = view;
	const back = () => {
		setView({
			title: "Your Incubators",
			el: <IncubatorList />,
			backBtn: false,
		});
	};
	const toProfile = () => {
		setView({ title: currentUser.email, el: <Profile />, backBtn: true });
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
									!backBtn && incubators.length === 0 ? `m-auto` : `mt-4`
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
