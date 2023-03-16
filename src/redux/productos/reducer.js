import {
  PRODUCTO_ADD,
  PRODUCTO_ADD_SUCCESS,
  PRODUCTO_DELETE,
  MOSTRAR_PRODUCTOS_CATEGORIA_SUCCESS,
} from '../actions';

const INIT_STATE = {
  items: [],
  todoItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  selectedItems: [],
  modalAddLoading: false,

  // DATOS DE LA CATEGORIA
  idCategoria: null,
  nombreCategoria: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCTO_ADD:
      return { ...state, modalAddLoading: true };
    case PRODUCTO_ADD_SUCCESS:
      return { ...state, modalAddLoading: false };
    case PRODUCTO_DELETE:
      return { ...state };
    case MOSTRAR_PRODUCTOS_CATEGORIA_SUCCESS:
      return {
        ...state,
        idCategoria: action.payload.idCategoria,
        nombreCategoria: action.payload.nombre,
      };
    default:
      return { ...state };
  }
};
