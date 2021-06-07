import api from "../../api";

const ENDPOINT = "achievements";
const ENDPOINT_CUT = "achievement";

const FETCH_ACHIEVEMENTS_REQUESTED = `${ENDPOINT}/FETCH_ACHIEVEMENTS_REQUESTED`;
const FETCH_ACHIEVEMENTS_SUCCEDED = `${ENDPOINT}/FETCH_ACHIEVEMENTS_SUCCEDED`;
const ADD_ACHIEVEMENT = `${ENDPOINT_CUT}/ADD_ACHIEVEMENT`;
const DELETE_ACHIEVEMENT = `${ENDPOINT_CUT}/DELETE_ACHIEVEMENTS`;
const FETCH_ACHIEVEMENT_SUCCEDED = `${ENDPOINT_CUT}/FETCH_ACHIEVEMENT_SUCCEDED`;
const EDIT_POST_SUCCEDED = `${ENDPOINT_CUT}/EDIT_POST_SUCCEDED`;
const INITIAL_STATE = {
  achievement: {},
  achievements: [],
  isLoading: false,
  isError: false,
};

const fetchRequested = () => ({ type:FETCH_ACHIEVEMENTS_REQUESTED });
const fetchSucceded = (data) => ({
  type: FETCH_ACHIEVEMENTS_SUCCEDED,
  payload: data,
});
const addAchievement = (data) => ({ type: ADD_ACHIEVEMENT, payload: data });
const deleteAchievement = (data) => ({ type: DELETE_ACHIEVEMENT, payload: data });
const fetchAchievementSucceded = (data) => ({
  type: FETCH_ACHIEVEMENT_SUCCEDED,
  payload: data,
});


export const fetchAchievements = () => {
  return async function (dispatch) {
    dispatch(fetchRequested());
    const response = await api.get(ENDPOINT);
    dispatch(fetchSucceded(response));
  };
};
export const setPost = (playerName, score) => {
  const data = {
    player: playerName,
    score: score,
    id: Date.now(),
  };
  return async function (dispatch) {
    const response = await api.post(ENDPOINT, data);
    dispatch(addAchievement(response));
  };
};

export const fetchAchievement = (id) => {
  return async function (dispatch) {
    const response = await api.get(ENDPOINT, id);
    dispatch(fetchAchievementSucceded(response));
  };
};
const redux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ACHIEVEMENTS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_ACHIEVEMENTS_SUCCEDED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        achievements: action.payload,
      };
    case ADD_ACHIEVEMENT:
      return {
        ...state,
        achievements: [
          ...state.achievements,
          {
            text: action.payload.text,
            id: action.payload.id,
          },
        ],
      };
    case FETCH_ACHIEVEMENT_SUCCEDED:
      let achievement = action.payload;
      return {
        ...state,
        achievement: achievement,
      };
    default:
      return state;
  }
};
export default redux;
