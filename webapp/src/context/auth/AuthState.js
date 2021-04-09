import React, { useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { db, auth, firebase } from "../../firebase";

import {
	SIGN_IN_FAIL,
	SET_LOADING,
	STOP_LOADING,
	USER_AUTH,
	SIGNED_OUT,
} from "./types";

const AuthState = (props) => {
	const initialState = {
		currentUser: null,
		authLoading: true,
		authErrorMsg: "",
		incubators: [],
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user === null) {
				stopLoading();
				//if user isn't authed
			} else {
				dispatch({
					type: USER_AUTH,
					payload: { currentUser: user },
				});
				stopLoading();
			}
		});
		//eslint-disable-next-line
	}, []);

	const handleSignIn = async (logOnDetail) => {
		const { email, password } = logOnDetail;
		startLoading();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			console.log("login to existing user");
			stopLoading();
		} catch (error) {
			if (error.code === "auth/wrong-password") {
				dispatch({
					type: SIGN_IN_FAIL,
					payload: "Wrong Password",
				});
			}
			alert(
				"Oops, we can't find the user with that credentials. Please try again."
			);
			stopLoading();
		}
		stopLoading();
	};

	const signOut = async () => {
		startLoading();
		try {
			await auth.signOut();

			dispatch({
				type: SIGNED_OUT,
			});
		} catch (err) {
			console.log("auth logout error");
		}
		stopLoading();
	};

	const startLoading = () => {
		dispatch({
			type: SET_LOADING,
		});
	};
	const stopLoading = () => {
		dispatch({
			type: STOP_LOADING,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser: state.currentUser,
				authLoading: state.authLoading,
				authErrorMsg: state.authErrorMsg,
				incubators: state.incubators,
				handleSignIn,
				signOut,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
