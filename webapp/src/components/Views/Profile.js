import React, { useContext } from "react";
import { BodyNormal } from "../../components/Typography/Typographies";
import { ButtonTextDanger } from "../Buttons/Buttons";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";
import IncubatorContext from "../../context/incubator/incubatorContext";

const StyledBtnTextDanger = styled(ButtonTextDanger)`
	position: absolute;
	bottom: 24px;
`;
const Profile = () => {
	const authContext = useContext(AuthContext);
	const { signOut } = authContext;
	const incubatorContext = useContext(IncubatorContext);
	const { incubators } = incubatorContext;
	return (
		<div className="d-flex flex-column">
			<BodyNormal>
				{incubators.length > 0 ? (
					<>You have in total {incubators.length} incubators</>
				) : (
					<>
						You currently have no incubator. Go back and set up a new one now!
					</>
				)}
			</BodyNormal>
			<StyledBtnTextDanger onClick={signOut}>Sign Out</StyledBtnTextDanger>
			{/* <MainButton type="submit" text="Sign In" disabled={false} /> */}
		</div>
	);
};

export default Profile;
