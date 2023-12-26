import React, { useContext } from 'react'
import { Strings } from 'utils/Constants';
import { StoreContext } from 'stores/Store';
import './style.css'
import Dropdown from './Dropdown';

/* import icons */
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import { Link } from 'react-router-dom';

export default function Header() {
    const { user, lang } = useContext(StoreContext)
    console.log(user)
    return (
        <div className='topSection'>
            <div className='headerSection flex'>
                {user ?
                    <>
                        <div className="title">
                            <h1>{Strings.header.welcome.title.loggedIn[lang]}</h1>
                            <p>{Strings.header.welcome.desc.loggedIn[lang].replace('%userdpname%', user.displayName)}</p>
                        </div>

                        <div className="searchBar flex">
                            <input type="text" placeholder={Strings.header.search[lang]} />
                            <MagnifyingGlass className='icon' />
                        </div>

                        <Dropdown />

                        {/* <div className="avatarDiv flex">
                            <RiNotification3Line className='icon' />
                            <div className='avatarImage'>
                                <img src="https://api.dicebear.com/7.x/notionists-neutral/svg?seed=Rascal" alt="Avatar" />
                            </div>
                        </div> */}
                    </> :
                    <>
                        <div className="title">
                            <h1>{Strings.header.welcome.title.notLogged[lang]}</h1>
                            <p>{Strings.header.welcome.desc.notLogged[lang]}</p>
                        </div>

                        <div className="buttonDiv flex">
                            <Link to={"/register"} className='registerBtn btn flex'>
                                <span>Đăng ký</span>
                                <UserPlus className='icon' weight='bold' />
                            </Link>

                            <Link to={"/login"} className='loginBtn btn flex'>
                                <span>Đăng nhập</span>
                            </Link>
                        </div>
                    </>}
            </div>
        </div>
    )
}
