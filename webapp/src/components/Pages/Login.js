import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import Header from "../Header/Header";
import { Input } from "../Forms/Input";
import { MainButton } from "../Buttons/Buttons";
import AuthContext from "../../context/auth/authContext";
import spinner from "../../loading.gif";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const StyledSpinner = styled.img`
	width: 48px;
	height: 48px;
	margin: auto;
`;
const Login = () => {
	const authContext = useContext(AuthContext);

	const { handleSignIn, authLoading, currentUser } = authContext;

	const [loginDetail, setLoginDetail] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
	};
	return (
		<div className="d-flex flex-column w-100">
			{authLoading ? (
				<StyledSpinner src={spinner} alt="Loading" />
			) : (
				<>
					{currentUser === null ? (
						<>
							<Header title="Sign In" />

							<Form
								onSubmit={(e) => {
									e.preventDefault();
									handleSignIn(loginDetail);
								}}
							>
								<div className=" mt-4">
									<Input
										name="email"
										title="E-mail"
										placeholder="example@mail.com"
										type="email"
										onChange={handleChange}
									/>
								</div>
								<div className=" mt-4">
									<Input
										onChange={handleChange}
										title="Password"
										placeholder="Password"
										type="password"
										name="password"
										caption="Password must be at least 6 characters long"
									/>
								</div>

								<MainButton
									type="submit"
									text="Sign In"
									disabled={
										loginDetail.password.length < 6 ||
										loginDetail.email.length < 4
									}
								/>
							</Form>
						</>
					) : (
						<Redirect to="/app" />
					)}
				</>
			)}
		</div>
	);
};

export default Login;
