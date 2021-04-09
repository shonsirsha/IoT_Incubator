import { USER_AUTH, SET_LOADING, STOP_LOADING, SIGNED_OUT } from "./types";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case USER_AUTH:
			return {
				...state,
				currentUser: action.payload.currentUser,
			};
		case SIGNED_OUT:
			return {
				...state,
				currentUser: null,
				questions: [],
			};
		case SET_LOADING:
			return {
				...state,
				authLoading: true,
			};

		case STOP_LOADING:
			return {
				...state,
				authLoading: false,
			};
		default:
			return;
	}
};
