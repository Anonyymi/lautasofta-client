import React from 'react';
import './AdminMenu.css';

function AdminMenu(props) {
  return (
    <div className="admin_menu">
      <span>[</span>
      <span className="admin_menu_title">ADMIN </span>
      <div className="admin_menu_item">
        <a href="/admin/posts">posts </a>
        <a href="/admin/reports">reports </a>
        <a href="/admin/bans">bans</a>
      </div>
      <span>]</span>
    </div>
  );
}

export default AdminMenu;
