import React, { useState } from "react";
import Header from "../Header/Header";
import { Input } from "../Forms/Input";
import { MainButton } from "../Buttons/Buttons";
const Login = () => {
	const [loginDetail, setLoginDetail] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setLoginDetail({ ...loginDetail, [e.target.name]: e.target.value });
	};
	return (
		<div className="d-flex flex-column w-100">
			<Header title="Sign In" />
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

			<MainButton type="submit" text="Sign In" disabled />
		</div>
	);
};

export default Login;
