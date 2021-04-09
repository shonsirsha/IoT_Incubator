import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Redirect } from "react-router-dom";
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
						<p>Main Frontend WebApp</p>
					)}
				</>
			)}
		</>
	);
};

export default MainApp;
