import { SET_LOADING, STOP_LOADING } from "./types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
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
