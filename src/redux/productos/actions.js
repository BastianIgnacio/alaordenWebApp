// eslint-disable-next-line import/no-cycle
import {
  PRODUCTO_ADD,
  PRODUCTO_ADD_SUCCESS,
  PRODUCTO_UPDATE,
  PRODUCTO_DELETE,
} from '../actions';

export const addProductoItem = (
  producto,
  imageBase64,
  toggleModal,
  resetForm,
  resetImage
) => ({
  type: PRODUCTO_ADD,
  payload: {
    producto,
    imageBase64,
    toggleModal,
    resetForm,
    resetImage,
  },
});

export const addProductoSuccess = () => ({
  type: PRODUCTO_ADD_SUCCESS,
});

export const updateProductoItem = (categoria) => ({
  type: PRODUCTO_UPDATE,
  payload: categoria,
});

export const deleteProductoItem = (idProducto, fullPath) => ({
  type: PRODUCTO_DELETE,
  payload: { idProducto, fullPath },
});
