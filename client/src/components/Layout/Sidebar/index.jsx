import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './style.css'
import { Strings } from 'utils/Constants';
import { StoreContext } from 'stores/Store';

import { House, Stack, SquaresFour, UsersThree, UserCircle, Question } from "@phosphor-icons/react"

import logo from 'assets/logo.png'

export default function Sidebar() {
    const { lang } = useContext(StoreContext)
    const location = useLocation();

    const menuItems = [
        { title: Strings.sidebar.quickMenu.home[lang], path: '/', icon: House, selectIcon: House },
        { title: Strings.sidebar.quickMenu.boards[lang], path: '/boards', icon: SquaresFour, selectIcon: SquaresFour },
        { title: Strings.sidebar.quickMenu.resources[lang], path: '/files', icon: Stack, selectIcon: Stack },
        { title: Strings.sidebar.quickMenu.members[lang], path: '/user', icon: UsersThree, selectIcon: UsersThree },
    ];

    const settingItems = [
        { title: Strings.sidebar.others.accounts[lang], path: '/accounts', icon: UserCircle, selectIcon: UserCircle }
    ];
    return (
        <div className='sideBar grid'>
            <Link to={"/"} className='logoDiv flex'>
                <img src={logo} alt="Logo" />
                <h2>4rums</h2>
            </Link>

            <div className='menuDiv'>
                <h3 className='divTitle'>
                    {Strings.sidebar.quickMenu[lang]}
                </h3>

                <ul className='menuLists grid'>
                    {menuItems.map((menu, index) => (
                        <li className={`listItem ${location.pathname === menu.path && 'active'}`} key={index}>
                            <Link to={menu.path} className='menuLink flex'>
                                {location.pathname === menu.path ? <menu.selectIcon className='icon' weight='fill' /> : <menu.icon className='icon' weight='bold' />}
                                <span className='smallText'>
                                    {menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-line"></div>

            <div className='settingsDiv'>
                <h3 className='divTitle'>
                    {Strings.sidebar.others[lang]}
                </h3>

                <ul className='menuLists grid'>
                    {settingItems.map((menu, index) => (
                        <li className={`listItem ${location.pathname === menu.path && 'active'}`} key={index}>
                            <Link to={menu.path} className='menuLink flex'>
                                {location.pathname === menu.path ? <menu.selectIcon className='icon' weight='fill' /> : <menu.icon className='icon' weight='bold' />}
                                <span className='smallText'>
                                    {menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sideBarCard">
                <Question className='icon' />
                <div className="cardContent">
                    <div className="circle1"></div>
                    <div className="circle2"></div>

                    <h3>Trung Tâm Trợ Giúp</h3>
                    <p>Gặp sự cố trong diễn đàn, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
                    <button className='btn'>Đi đến trung tâm</button>
                </div>
            </div>
        </div>
    )
}
