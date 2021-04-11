import React, { useReducer } from "react";
import IncubatorContext from "./incubatorContext";
import IncubatorReducer from "./incubatorReducer";
import { db } from "../../firebase";

import { SET_LOADING, STOP_LOADING, GET_INCUBATORS } from "./types";

const IncubatorState = (props) => {
	const initialState = {
		incubators: [],
		incubatorLoading: true,
	};

	const [state, dispatch] = useReducer(IncubatorReducer, initialState);

	// useEffect(() => {
	// 	let allIncubators = getAllIncubators();
	// 	console.log(allIncubators);
	// 	dispatch({
	// 		type: GET_INCUBATORS,
	// 		payload: allIncubators,
	// 	});
	// 	//eslint-disable-next-line
	// }, []);

	const checkIfExists = async (deviceName) => {
		const v = await db.ref(deviceName).get();

		return v.exists();
	};

	const getAllIncubators = () => {
		startLoading();
		let incArr = [];

		db.ref("incubators").on("value", (snapshot) => {
			incArr = [];
			const data = snapshot.val();
			if (data) {
				const keys = Object.keys(data);
				keys.map((k) => {
					return incArr.push(data[k]);
				});
				dispatch({
					type: GET_INCUBATORS,
					payload: incArr.sort((a, b) => b.createdAt - a.createdAt),
				});
			}
			stopLoading();
		});
	};

	const alterIncubatorStatus = (data) => {
		const { deviceName, active } = data;
		db.ref("incubators/" + deviceName).update({ active: !active });
	};

	const deleteIncubator = (deviceName) => {
		db.ref("incubators/" + deviceName).remove();
	};

	const setupIncubator = async (data) => {
		startLoading();
		const { deviceName, createdAt, hatchPreset } = data;
		const exists = await checkIfExists(deviceName);
		if (!exists) {
			await db.ref("incubators/" + deviceName).set({
				createdAt,
				hatchPreset,
				deviceName,
				active: false,
				currentTemp: -100,
				currentHum: -100,
				deviceId: `${hatchPreset.id}-${createdAt}`,
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
				getAllIncubators,
				deleteIncubator,
				alterIncubatorStatus,
			}}
		>
			{props.children}
		</IncubatorContext.Provider>
	);
};

export default IncubatorState;
