import {
  CATEGORIA_ADD,
  CATEGORIA_ADD_SUCCESS,
  CATEGORIA_DELETE,
  // eslint-disable-next-line no-unused-vars
  CATEGORIA_DELETE_SUCESS,
} from '../actions';

const INIT_STATE = {
  items: [],
  todoItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  selectedItems: [],

  // VARIABLES PARA CONTROLAR LA ADICION DE UNA CATEGORIA
  modalAddLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CATEGORIA_ADD:
      return { ...state, modalAddLoading: true };
    case CATEGORIA_ADD_SUCCESS:
      return { ...state, modalAddLoading: false };
    case CATEGORIA_DELETE:
      return { ...state };
    default:
      return { ...state };
  }
};
