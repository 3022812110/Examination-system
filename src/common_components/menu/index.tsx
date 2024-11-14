import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {  superAdminMenus } from '@/config';
import usePathKey from '@/hooks/usePathKey';





const Nav: React.FC = () => {
  const [current, setCurrent] = useState<string>('');
  const Navigate = useNavigate();

  const menus = superAdminMenus;
  const path_key = usePathKey;


  //切换菜单
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    // Navigate(routersDate[e.key as RouterKeys].path);
    Navigate(e.key);
  };

  //保持菜单高亮
  useEffect(() => {
    if(path_key) {
        setCurrent(path_key)
    }
  },[path_key])
    
  


  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} />;
};

export default Nav;