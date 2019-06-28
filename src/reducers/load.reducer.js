import constant from '../constant/constant'

const initialState = {
  loading: false,
  is_success: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.START_LOADING:
      return { ...state, loading: true }
    case constant.STOP_LOADING:
      return { ...state, loading: false }
    case constant.START_SUCCESS:
      return { ...state, is_success: true }
    case constant.STOP_SUCCESS:
      return { ...state, is_success: false }
    default:
      return state
  }
}
