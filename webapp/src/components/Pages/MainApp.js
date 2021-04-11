import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import IncubatorList from "../../components/Views/IncubatorList";
import DetailIncubator from "../../components/Views/DetailIncubator";

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
	const { authLoading, currentUser } = authContext;
	const [deviceDetailData, setDeviceDetailData] = useState(null);

	const [view, setView] = useState({
		id: "DEVICELIST",
		title: "Your Incubators",
		el: (
			<IncubatorList
				setDeviceDetailData={setDeviceDetailData}
				btnFunc={() => toSetupnewIncubator()}
				deviceDetailData={deviceDetailData}
			/>
		),
		backBtn: false,
	});
	useEffect(() => {
		if (deviceDetailData) {
			setView({
				id: "DETAIL",
				title: deviceDetailData.deviceName,
				el: <DetailIncubator deviceDetailData={deviceDetailData} />,
				mainBtnText: "",
				backBtn: true,
			});
		}
	}, [deviceDetailData]);

	const { el, title, backBtn } = view;
	const back = () => {
		setView({
			id: "DEVICELIST",
			title: "Your Incubators",
			el: (
				<IncubatorList
					setDeviceDetailData={setDeviceDetailData}
					deviceDetailData={deviceDetailData}
					btnFunc={() => toSetupnewIncubator()}
				/>
			),
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
							<div className={`d-flex flex-column w-100 h-100 mt-4`}>{el}</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default MainApp;
