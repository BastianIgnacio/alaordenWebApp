import React from 'react';
import { Card, CustomInput, Badge, Button } from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const DataListView = ({
  product,
  isSelect,
  collect,
  onCheckItem,
  setModalOpen,
}) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <p className="list-item-heading mb-1 truncate">
                {product.data.nombre.toUpperCase()}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {`$ ${product.data.precio}`}
              </p>
              {product.data.habilitado ? (
                <Badge color="success" pill>
                  HABILITADO
                </Badge>
              ) : (
                <Badge color="secondary" pill>
                  INHABILITADO
                </Badge>
              )}
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <Button
                color="primary"
                size="xs"
                block
                onClick={() => setModalOpen(true)}
              >
                <IntlMessages id="producto.editar" />
              </Button>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
