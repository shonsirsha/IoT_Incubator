import React, { useReducer } from "react";
import IncubatorContext from "./incubatorContext";
import IncubatorReducer from "./incubatorReducer";
import { db } from "../../firebase";

import { SET_LOADING, STOP_LOADING } from "./types";

const IncubatorState = (props) => {
	const initialState = {
		incubators: [],
		incubatorLoading: false,
	};

	const [state, dispatch] = useReducer(IncubatorReducer, initialState);

	const checkIfExists = async (deviceName) => {
		const v = await db.ref(deviceName).get();

		return v.exists();
	};

	const setupIncubator = async (data) => {
		startLoading();
		const { deviceName, createdAt, hatchPreset } = data;
		const exists = await checkIfExists(deviceName);
		if (!exists) {
			await db.ref(deviceName).set({
				createdAt,
				hatchPreset,
				deviceName,
				active: false,
				currentTemp: -100,
				currentHum: -100,
			});
			stopLoading();
			return true;
		} else {
			alert(
				"Please use a different name (one of your incubators already uses this name)"
			);
			stopLoading();
			return false;
		}
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
		<IncubatorContext.Provider
			value={{
				incubators: state.incubators,
				incubatorLoading: state.incubatorLoading,
				setupIncubator,
				checkIfExists,
			}}
		>
			{props.children}
		</IncubatorContext.Provider>
	);
};

export default IncubatorState;
