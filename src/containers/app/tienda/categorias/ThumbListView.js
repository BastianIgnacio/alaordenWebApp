import React from 'react';
import { Card, CustomInput, Badge, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const ThumbListView = ({
  categoria,
  mostrarProductos,
  isSelect,
  collect,
  onCheckItem,
}) => {
  return (
    <Colxx xxs="12" key={categoria.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={categoria} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, categoria.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {categoria.data.habilitado ? (
            <Badge
              color="success"
              pill
              className="position-absolute badge-top-left"
            >
              HABILITADO
            </Badge>
          ) : (
            <Badge
              color="secondary"
              pill
              className="position-absolute badge-top-left"
            >
              INHABILITADO
            </Badge>
          )}
          <img
            alt={categoria.data.nombre}
            src={categoria.data.refImagen}
            className="list-thumbnail responsive border-0 card-img-left"
          />
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${categoria.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {categoria.data.nombre.toUpperCase()}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {`${categoria.data.cantidadProductos} Productos`}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <Button
                  color="primary"
                  size="xs"
                  block
                  onClick={() =>
                    mostrarProductos(categoria.data.nombre, categoria.id)
                  }
                >
                  <IntlMessages id="categoria.verProductos" />
                </Button>
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={categoria.statusColor} pill>
                  {categoria.status}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${categoria.id}`}
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
export default React.memo(ThumbListView);
