/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { useDispatch } from 'react-redux';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';

import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon,
} from '../../../../components/svg';
import { deleteGroupCategoria } from '../../../../redux/categorias/actions';

// eslint-disable-next-line no-unused-vars
const eliminarLista = (
  list,
  items,
  setSelectedItems,
  dispatch,
  setIsLoaded
) => {
  // eslint-disable-next-line no-unused-vars
  const newListToDelete = [];
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const i in list) {
    const idEliminar = list[i];
    // Ahora debemos buscar y copiar el objeto completo
    const itemFind = items.find((element) => element.id === idEliminar);
    const itemAdd = { ...itemFind };
    newListToDelete.push(itemAdd);
  }
  // TENEMOS QUE COPIAR UNA LISTA NUEVA CON LOS ITEMS A ELIMINAR
  console.log(newListToDelete);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  dispatch(
    deleteGroupCategoria(newListToDelete, setIsLoaded, setSelectedItems)
  );
};

const ListPageHeading = ({
  displayMode,
  changeDisplayMode,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
  selectedItems,
  setSelectedItems,
  items,
  setIsLoaded,
}) => {
  const dispatch = useDispatch();
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => toggleModal()}
            >
              <IntlMessages id="categoria.add" />
            </Button>
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    eliminarLista(
                      selectedItems,
                      items,
                      setSelectedItems,
                      dispatch,
                      setIsLoaded
                    );
                  }}
                >
                  <IntlMessages id="categoria.eliminar" />
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    console.log('click en nhabilitar');
                    console.log(selectedItems);
                  }}
                >
                  <IntlMessages id="categoria.inhabilitar" />
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    console.log('click en Habilitar');
                    console.log(selectedItems);
                  }}
                >
                  <IntlMessages id="categoria.habilitar" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <Breadcrumb match={match} />
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="categoria.opcionesVisualizacion" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <span className="mr-3 d-inline-block float-md-left">
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'list' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('list')}
              >
                <DataListIcon />
              </a>
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'thumblist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('thumblist')}
              >
                <ThumbListIcon />
              </a>
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'imagelist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('imagelist')}
              >
                <ImageListIcon />
              </a>
            </span>

            <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="categoria.ordenarPor" />
                  {selectedOrderOption.label}
                </DropdownToggle>
                <DropdownMenu>
                  {orderOptions.map((order, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changeOrderBy(order.column)}
                      >
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
