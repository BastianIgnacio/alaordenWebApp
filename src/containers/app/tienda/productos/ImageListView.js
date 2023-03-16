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
  product,
  isSelect,
  collect,
  onCheckItem,
  setModalOpen,
}) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product.id}>
      <ContextMenuTrigger id="menu_id" data={product} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <CardImg
              className="c-pointer"
              top
              alt={product.data.nombre}
              src={product.data.refImagen}
              onClick={() => setModalOpen(true)}
            />
            {product.data.habilitado ? (
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
                  id={`check_${product.id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle className="font-weight-bold">
                  {product.data.nombre.toUpperCase()}
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {`$ ${product.data.precio}`}
                </CardText>
              </Colxx>
              <Colxx xxs="12">
                <Button
                  color="primary"
                  size="xs"
                  block
                  onClick={() => setModalOpen(true)}
                >
                  <IntlMessages id="producto.editar" />
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
