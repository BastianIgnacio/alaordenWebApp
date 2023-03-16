import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu id="menu_id" onShow={(e) => onContextMenu(e, e.detail.data)}>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'editar' }}>
        <i className="simple-icon-note" /> <span>Editar</span>
      </MenuItem>
      <MenuItem
        onClick={onContextMenuClick}
        data={{ action: 'inhabilitar/habilitar' }}
      >
        <i className="iconsminds-on-off" /> <span>Habilitar / Inhabilitar</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'eliminar' }}>
        <i className="simple-icon-trash" /> <span>Eliminar</span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainer;
