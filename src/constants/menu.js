import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'tiendaVirtual',
    icon: 'iconsminds-shop-4',
    label: 'menu.tienda',
    to: `${adminRoot}/tienda/categorias`,
  },
  {
    id: 'ventas',
    icon: 'iconsminds-cash-register-2',
    label: 'menu.ventas',
    to: `${adminRoot}/ventas/estadisticas`,
    subs: [
      {
        icon: 'iconsminds-statistic',
        label: 'menu.estadisticas',
        to: `${adminRoot}/ventas/estadisticas`,
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.ventas',
        to: `${adminRoot}/ventas/ventas`,
      },
    ],
  },
  {
    id: 'gestorOrdenes',
    icon: 'iconsminds-check',
    label: 'menu.ordenes',
    to: `${adminRoot}/gestorOrdenes/visualizadorCocina`,
    subs: [
      {
        icon: 'simple-icon-eye',
        label: 'menu.visualizador',
        to: `${adminRoot}/gestorOrdenes/visualizadorCocina`,
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.enCola',
        to: `${adminRoot}/gestorOrdenes/enCola`,
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.enPreparacion',
        to: `${adminRoot}/gestorOrdenes/enPreparacion`,
      },
    ],
  },
  {
    id: 'configuracion',
    icon: 'iconsminds-gear',
    label: 'menu.configuracion',
    to: `${adminRoot}/configuraciones/tienda`,
    subs: [
      {
        icon: 'iconsminds-shop-4',
        label: 'menu.tienda',
        to: `${adminRoot}/configuraciones/tienda`,
      },
      {
        icon: 'simple-icon-credit-card',
        label: 'menu.mediosPago',
        to: `${adminRoot}/configuraciones/mediosPago`,
      },
      {
        icon: 'simple-icon-credit-card',
        label: 'menu.mercadopago',
        to: `${adminRoot}/configuraciones/mercadopago`,
      },
    ],
  },
  {
    id: 'qr',
    icon: 'iconsminds-qr-code',
    label: 'menu.qr',
    to: `${adminRoot}/qrGenerador`,
  },
];
export default data;
