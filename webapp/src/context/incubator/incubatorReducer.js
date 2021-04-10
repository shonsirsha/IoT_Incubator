import { SET_LOADING, STOP_LOADING, GET_INCUBATORS } from "./types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case GET_INCUBATORS:
			return {
				...state,
				incubators: action.payload,
			};
		case SET_LOADING:
			return {
				...state,
				incubatorLoading: true,
			};

		case STOP_LOADING:
			return {
				...state,
				incubatorLoading: false,
			};
		default:
			return;
	}
};
