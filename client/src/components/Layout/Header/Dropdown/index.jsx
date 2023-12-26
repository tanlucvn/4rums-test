import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useTheme } from 'react-hook-theme';

import { UserCircle, Gear, Sun, Moon, Translate, CaretRight, SignOut, CaretLeft, Check } from "@phosphor-icons/react"

import { StoreContext } from 'stores/Store';

import { BACKEND, Strings } from 'utils/Constants';

import CustomScrollbar from 'components/CustomScrollbar';

import './style.css';

const DropdownItem = ({ onClick, data, setActiveMenu, goToMenu, leftIcon, rightIcon, header, children }) => {

    const click = () => {
        goToMenu && setActiveMenu(goToMenu)
        onClick && onClick(data)
    }

    return (
        <span className={'menuItem'} onClick={click}>
            {leftIcon && (
                <span className="leftIcon">
                    {leftIcon}
                </span>
            )}
            {children}
            {rightIcon && (
                <span className="rightIcon">
                    {rightIcon}
                </span>
            )}
        </span>
    )
}

const DropdownMenu = ({ user, logout, lang, setLang, setDropdownOpen }) => {
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)
    const { theme, setTheme } = useTheme();
    const dropdown = useRef()

    useEffect(() => {
        setMenuHeight(dropdown.current?.querySelector('.dropdownMenu').offsetHeight + 16)
    }, [])

    useEffect(() => {
        const handleScrollAndClickOutside = ({ target }) => {
            if (dropdown.current && !dropdown.current.contains(target)) {
                const avatar = document.querySelector('.avatarPicture');
                if (avatar && avatar.contains(target)) return; // Ignore clicks on the avatar
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleScrollAndClickOutside, true);
        document.addEventListener('scroll', handleScrollAndClickOutside, true);

        return () => {
            document.removeEventListener('click', handleScrollAndClickOutside, true);
            document.removeEventListener('scroll', handleScrollAndClickOutside, true);
        };
    }, [setDropdownOpen]);


    const calcHeight = (el) => {
        const height = el.offsetHeight
        setMenuHeight(height + 18)
    }

    const setLanguage = (data) => {
        setLang(data.lang)
    }

    const goTo = (data) => {
        setDropdownOpen(false)
        navigate(data.url)
    }

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    const onLogout = () => {
        setDropdownOpen(false)
        logout()
    }

    return (
        <div className="avatarDropdown" style={{ height: menuHeight }} ref={dropdown}>
            <CustomScrollbar className="dropdownContainer">

                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={300}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}
                >
                    <div className="dropdownMenu">
                        <DropdownItem
                            leftIcon={<UserCircle weight='fill' />}
                            onClick={goTo}
                            data={{ url: '/user/' + user.name }}
                        >
                            <div className="itemTitle">{Strings.dropdown.profiles[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<Gear weight='fill' />}
                            onClick={goTo}
                            data={{ url: '/user/' + user.name + '/settings' }}
                        >
                            <div className="itemTitle">{Strings.dropdown.settings[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={theme === 'dark' ? <Moon weight='fill' /> : <Sun weight='fill' />}
                            onClick={changeTheme}
                        >
                            <div className="itemTitle">{Strings.dropdown.changeThemes[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<Translate weight='fill' />}
                            rightIcon={<CaretRight weight='bold' />}
                            goToMenu="language"
                            setActiveMenu={setActiveMenu}
                        >
                            <div className="itemTitle">{Strings.dropdown.changeLanguages[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<SignOut weight='bold' />}
                            onClick={onLogout}
                        >
                            <div className="itemTitle">{Strings.dropdown.logout[lang]}</div>
                        </DropdownItem>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={activeMenu === 'language'}
                    timeout={300}
                    classNames="menu-secondary"
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="dropdownMenu">
                        <DropdownItem
                            goToMenu="main"
                            leftIcon={<CaretLeft weight='bold' />}
                            setActiveMenu={setActiveMenu}
                            header
                        >
                            <div className="itemTitle">{Strings.dropdown.changeLanguages[lang]}</div>
                        </DropdownItem>
                        <DropdownItem
                            goToMenu="main"
                            onClick={setLanguage}
                            data={{ lang: 'vi' }}
                            rightIcon={lang === 'vi' ? <Check weight='bold' /> : ''}
                            setActiveMenu={setActiveMenu}
                        >
                            <div className="itemTitle">{Strings.dropdown.changeLanguages.choosed[lang]['vi']}</div>
                        </DropdownItem>
                        <DropdownItem
                            goToMenu="main"
                            onClick={setLanguage}
                            data={{ lang: 'en' }}
                            rightIcon={lang === 'en' ? <Check weight='bold' /> : ''}
                            setActiveMenu={setActiveMenu}
                        >
                            <div className="itemTitle">{Strings.dropdown.changeLanguages.choosed[lang]['en']}</div>
                        </DropdownItem>
                    </div>
                </CSSTransition>

            </CustomScrollbar>
        </div>
    )
}

export default function Dropdown() {
    const { user, logout, lang, setLang } = useContext(StoreContext)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <li className="avatarSection">
            <div
                className="avatarPicture"
                style={user.picture && { backgroundImage: `url(${BACKEND + user.picture})` }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {!user.picture && user.displayName.charAt(0)}
            </div>

            {dropdownOpen && (
                <DropdownMenu
                    user={user}
                    logout={logout}
                    lang={lang}
                    setLang={setLang}
                    setDropdownOpen={setDropdownOpen}
                />
            )}
        </li>
    )
}
