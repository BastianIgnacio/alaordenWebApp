import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { element } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { database } from '../../../helpers/Firebase';
// eslint-disable-next-line no-unused-vars, import/order
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import ListPageHeading from '../../../containers/app/tienda/productos/ListPageHeading';
import AddNewModal from '../../../containers/app/tienda/productos/AddNewModal';
import ListPageListing from '../../../containers/app/tienda/productos/ListPageListing';
import useMousetrap from '../../../hooks/use-mousetrap';
import { getCurrentLocalComercial } from '../../../helpers/Utils';
import {
  updateProductoItem,
  deleteProductoItem,
} from '../../../redux/productos/actions';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { column: 'estado_desc', label: 'Estado - Habilitado' },
  { column: 'estado_asc', label: 'Estado - Inhabilitado' },
  { column: 'nombre', label: 'Alfabeto' },
];
const pageSizes = [4, 8, 12, 20];

const Productos = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const refCategoria = useSelector((state) => state.productos.idCategoria); // Este se debe obtener desde el redux
  const nombreCategoria = useSelector(
    (state) => state.productos.nombreCategoria
  );
  // eslint-disable-next-line no-unused-vars
  const [localComercial, setLocalComercial] = useState(
    getCurrentLocalComercial()
  );

  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'estado_desc',
    label: 'Estado - Habilitado',
  });

  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [totalItemCount, setTotalItemCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    if (refCategoria == null) {
      history.push('/app/tienda/categorias');
    }
    const q = query(
      collection(database, 'productos'),
      where('refCategoria', '==', refCategoria)
    );
    // eslint-disable-next-line no-unused-vars
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productos = [];
      querySnapshot.forEach((doc) => {
        const prod = {
          id: doc.id,
          data: doc.data(),
        };
        productos.push(prod);
      });
      setItems(productos);
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPageSize, currentPage, selectedOrderOption, refCategoria]);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    console.log(data);
    const { action } = data;
    const { id } = data.data;
    const { fullPath } = data.data.data;
    if (action === 'editar') {
      console.log(`Editar para el producto ${data.data}`);
    }
    if (action === 'eliminar') {
      // eslint-disable-next-line no-undef
      dispatch(deleteProductoItem(id, fullPath));
    }
    if (action === 'inhabilitar/habilitar') {
      const productoFind = items.find((prod) => prod.id === id);
      // COPIAMOS LA DATA DE LA CATEGORIA PERO HABILITANDO/DESHABILITANDO ELLA MISMA
      const dataCopy = {
        ...productoFind.data,
        habilitado: !productoFind.data.habilitado,
      };
      // CREAMOS LA NUEVA CATEGORIA CON LA NUEVA DATA
      const nuevoProducto = {
        ...productoFind,
        data: dataCopy,
      };
      console.log(nuevoProducto);
      console.log(`Inh hab para el producto ${data.data}`);
      // FINALMENTE DESPACHAMOS LA ACTION PARA ACTUALIZAR LA CATEGORIA
      dispatch(updateProductoItem(nuevoProducto));
    }
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading={nombreCategoria}
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItems={selectedItems}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          refCategoria={refCategoria}
          refLocalComercial={localComercial}
        />
        <ListPageListing
          match={match}
          localComercial={localComercial}
          items={items}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Productos;
