import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { element } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { database } from '../../../helpers/Firebase';
// eslint-disable-next-line no-unused-vars, import/order
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import ListPageHeading from '../../../containers/app/tienda/categorias/ListPageHeading';
import AddNewModal from '../../../containers/app/tienda/categorias/AddNewModal';
import ListPageListing from '../../../containers/app/tienda/categorias/ListPageListing';
import useMousetrap from '../../../hooks/use-mousetrap';

// Import SAGA ACTIONS
import {
  deleteCategoria,
  updateCategoriaItem,
  mostrarProductosCategoria,
} from '../../../redux/categorias/actions';
import { getCurrentLocalComercial } from '../../../helpers/Utils';

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

const Categorias = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('imagelist');
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
  // eslint-disable-next-line no-unused-vars
  const [localComercial, setLocalComercial] = useState(
    getCurrentLocalComercial()
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    // Primero hay que saber las posiciones que vamos a pedir
    // Esto se hace con la currentPage y la selectedPageSize
    if (selectedOrderOption.column === 'estado_desc') {
      const q = query(
        collection(database, 'categorias'),
        where('refLocalComercial', '==', localComercial.id),
        orderBy('habilitado', 'desc'),
        orderBy('nombre', 'asc')
      );
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const categorias = [];
        querySnapshot.forEach((doc) => {
          const cat = {
            id: doc.id,
            data: doc.data(),
          };
          categorias.push(cat);
        });
        setItems(categorias);
      });
    }
    if (selectedOrderOption.column === 'estado_asc') {
      const q = query(
        collection(database, 'categorias'),
        where('refLocalComercial', '==', localComercial.id),
        orderBy('habilitado', 'asc'),
        orderBy('nombre', 'asc')
      );
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const categorias = [];
        querySnapshot.forEach((doc) => {
          const cat = {
            id: doc.id,
            data: doc.data(),
          };
          categorias.push(cat);
        });
        setItems(categorias);
      });
    }
    if (selectedOrderOption.column === 'nombre') {
      const q = query(
        collection(database, 'categorias'),
        where('refLocalComercial', '==', localComercial.id),
        orderBy('nombre', 'asc')
      );
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const categorias = [];
        querySnapshot.forEach((doc) => {
          const cat = {
            id: doc.id,
            data: doc.data(),
          };
          categorias.push(cat);
        });
        setItems(categorias);
      });
    }
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPageSize, currentPage, selectedOrderOption]);

  const mostrarProductos = (nombre, idCategoria) => {
    const path = '/app/tienda/productos';
    dispatch(mostrarProductosCategoria(nombre, idCategoria, history, path));
  };
  const onCheckItem = (event, id) => {
    console.log('on check item');
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
    const idCategoria = data.data.id;
    const nombreCategoria = data.data.data.nombre;
    const { fullPath } = data.data.data;
    if (data.action === 'verMas') {
      mostrarProductos(nombreCategoria, idCategoria);
    }
    if (data.action === 'editar') {
      console.log(`editar para la categoria ${data.data}`);
      // DISPATCH LA ACCION
    }
    if (data.action === 'eliminar') {
      dispatch(
        deleteCategoria(idCategoria, fullPath, setSelectedItems, setIsLoaded)
      );
    }
    if (data.action === 'inhabilitar/habilitar') {
      // BUSCAMOS LA CATEGORIA
      const categoriaFind = items.find((cat) => cat.id === idCategoria);
      // COPIAMOS LA DATA DE LA CATEGORIA PERO HABILITANDO/DESHABILITANDO ELLA MISMA
      const dataCopy = {
        ...categoriaFind.data,
        habilitado: !categoriaFind.data.habilitado,
      };
      // CREAMOS LA NUEVA CATEGORIA CON LA NUEVA DATA
      const nuevaCategoria = {
        ...categoriaFind,
        data: dataCopy,
      };
      // FINALMENTE DESPACHAMOS LA ACTION PARA ACTUALIZAR LA CATEGORIA
      dispatch(updateCategoriaItem(nuevaCategoria));
    }
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data.id;
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
          heading="menu.tiendaCategorias"
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
          items={items}
          setIsLoaded={setIsLoaded}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModal
          localComercial={localComercial}
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <ListPageListing
          localComercial={localComercial}
          items={items}
          mostrarProductos={mostrarProductos}
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

export default Categorias;
