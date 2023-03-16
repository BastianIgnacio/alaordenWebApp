import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge,
  Button,
} from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const ImageListView = ({
  categoria,
  mostrarProductos,
  isSelect,
  collect,
  onCheckItem,
}) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={categoria.id}>
      <ContextMenuTrigger id="menu_id" data={categoria} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, categoria.id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <CardImg
              className="c-pointer"
              top
              alt={categoria.data.nombre}
              src={categoria.data.refImagen}
              onClick={() =>
                mostrarProductos(categoria.data.nombre, categoria.id)
              }
            />
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
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${categoria.id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle className="font-weight-bold">
                  {categoria.data.nombre.toUpperCase()}
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {`${categoria.data.cantidadProductos} Productos`}
                </CardText>
              </Colxx>
              <Colxx xxs="12">
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
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
