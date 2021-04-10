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

	const setupIncubator = async (data) => {
		startLoading();
		const { deviceName, createdAt, hatchPreset } = data;
		await db
			.ref(deviceName)
			.set({
				createdAt,
				hatchPreset,
				deviceName,
				active: false,
				currentTemp: -100,
				currentHum: -100,
			});
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
		<IncubatorContext.Provider
			value={{
				incubators: state.incubators,
				incubatorLoading: state.incubatorLoading,
				setupIncubator,
			}}
		>
			{props.children}
		</IncubatorContext.Provider>
	);
};

export default IncubatorState;
