import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';
import ImageListView from './ImageListView';
import ThumbListView from './ThumbListView';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  mostrarProductos,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  localComercial,
}) => {
  return (
    <Row>
      {items.map((categoria) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              localComercial={localComercial}
              mostrarProductos={mostrarProductos}
              key={categoria.id}
              categoria={categoria}
              isSelect={selectedItems.includes(categoria.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            <ThumbListView
              key={categoria.id}
              mostrarProductos={mostrarProductos}
              categoria={categoria}
              isSelect={selectedItems.includes(categoria.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        return (
          <DataListView
            key={categoria.id}
            mostrarProductos={mostrarProductos}
            categoria={categoria}
            isSelect={selectedItems.includes(categoria.id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
