import React, { useState } from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';
import ImageListView from './ImageListView';
import ThumbListView from './ThumbListView';
import EditarModal from './EditarModal';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  match,
  items,
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
  // eslint-disable-next-line no-unused-vars
  const [modalEditar, setModalEditar] = useState(false);
  return (
    <Row>
      {items.map((product) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              match={match}
              localComercial={localComercial}
              key={product.id}
              product={product}
              isSelect={selectedItems.includes(product.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              setModalOpen={setModalEditar}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            <ThumbListView
              key={product.id}
              product={product}
              isSelect={selectedItems.includes(product.id)}
              collect={collect}
              onCheckItem={onCheckItem}
              setModalOpen={setModalEditar}
            />
          );
        }
        return (
          <DataListView
            key={product.id}
            product={product}
            isSelect={selectedItems.includes(product.id)}
            onCheckItem={onCheckItem}
            collect={collect}
            setModalOpen={setModalEditar}
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
      <EditarModal
        modalOpen={modalEditar}
        toggleModal={() => {
          setModalEditar(!modalEditar);
        }}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
