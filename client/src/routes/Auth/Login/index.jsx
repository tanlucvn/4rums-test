import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Strings } from 'utils/Constants';
import { StoreContext } from 'stores/Store';
import { useForm } from 'hooks/useForm';
import Breadcrumbs from 'components/Breadcrumbs';
import Input from 'components/Form/Input';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import { logo } from 'assets';
import './style.css'

import { User, LockKey } from "@phosphor-icons/react"

export default function Login() {
    const { login, lang } = useContext(StoreContext)
    const navigate = useNavigate();
    document.title = '4rums | Login'

    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const loginUserCallback = () => {
        loginUser()
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const loginUser = async () => {
        if (loading) return;

        setErrors({});

        if (!values.username.trim()) {
            return setErrors({ username: Strings.loginPage.username.errors[lang] });
        }
        if (!values.password.trim()) {
            return setErrors({ password: Strings.loginPage.password.errors[lang] });
        }

        setLoading(true);

        try {
            const response = await fetch('https://fourrums-server.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            setLoading(false);
            const data = await response.json();

            if (data.accessToken) {
                login(data);
                setSuccess(true);
                setTimeout(() => navigate('/'), 10);
            } else {
                throw new Error(data.error?.message || 'Error');
            }
        } catch (err) {
            setErrors({ general: err.message === '[object Object]' ? 'Error' : err.message });
            setTimeout(() => setErrors(""), 2000);
        }
    };

    if (errors.general === "Failed to fetch") {
        setErrors({ msg: Strings.loginPage.submit.errors.failedToFetch[lang] })
    } else if (errors.general === "Username or password not valid") {
        setErrors({ msg: Strings.loginPage.submit.errors.notValid[lang] })
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        }
    }, [success]);

    return (
        <>
            <Breadcrumbs current={Strings.breadcrumbs.login[lang]} links={[
                { title: Strings.breadcrumbs.home[lang], link: '/' }
            ]} />

            <div className='loginPage flex'>
                <div className='loginContainer flex'>
                    <div className="formDiv flex">
                        <div className="headerDiv">
                            <img src={logo} alt="Logo" />
                            <h3>{Strings.loginPage.title[lang]}</h3>
                        </div>

                        <form onSubmit={onSubmit} className='form grid'>
                            <div className="inputDiv">
                                <div className="inputLabel">
                                    {Strings.loginPage.username.label[lang]}
                                    <span className='errorText'>
                                        {errors.username}
                                    </span>
                                </div>
                                <div className={`input flex ${errors.username ? 'inputBorder error' : 'inputBorder'}`}>
                                    <User className='icon' />
                                    <Input type="text" name='username' id='username' placeholder={Strings.loginPage.username.placeholder[lang]} value={values.username} onChange={onChange} />
                                </div>
                            </div>

                            <div className="inputDiv">
                                <div className="inputLabel">
                                    {Strings.loginPage.password.label[lang]}
                                    <span className='errorText'>
                                        {errors.password}
                                    </span>
                                </div>
                                <div className={`input flex ${errors.password ? 'inputBorder error' : 'inputBorder'}`}>
                                    <LockKey className='icon' />
                                    <Input type="password" name='password' id='password' placeholder={Strings.loginPage.password.placeholder[lang]} value={values.password} onChange={onChange} />
                                </div>
                            </div>

                            {loading ?
                                <Loader className="btn" /> :
                                <button type='submit' className='btn flex'>
                                    <span>{Strings.loginPage.submit.title[lang]}</span>
                                </button>
                            }

                            <span className="forgotPassword">
                                {Strings.loginPage.forgotPassword.text[lang]} <a href="#!">{Strings.loginPage.forgotPassword.click[lang]}</a>
                            </span>
                        </form>

                        {success && <Alert type="success" message={Strings.loginPage.submit.success[lang]} />}
                        {errors.msg && <Alert type="error" message={errors.msg} />}
                    </div>
                </div>
            </div>
        </>
    )
}
