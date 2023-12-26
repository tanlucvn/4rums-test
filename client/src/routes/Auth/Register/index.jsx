import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BACKEND, Strings } from 'utils/Constants';
import { StoreContext } from 'stores/Store';
import { useForm } from 'hooks/useForm';
import Breadcrumbs from 'components/Breadcrumbs';
import Input from 'components/Form/Input';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import { logo } from 'assets';
import './style.css'

import { User, LockKey, EnvelopeSimple } from "@phosphor-icons/react"

export default function Register() {
    const { login, lang } = useContext(StoreContext)
    const navigate = useNavigate();
    document.title = '4rums | Login'

    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const registerUserCallback = () => {
        registerUser()
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const registerUser = async () => {
        if (loading) return

        setErrors({})

        if (!values.username.trim()) {
            return setErrors({ username: Strings.registerPage.username.errors[lang] })
        }
        if (!values.email.trim()) {
            return setErrors({ email: Strings.registerPage.email.errors[lang] })
        }
        if (!values.password.trim()) {
            return setErrors({ password: Strings.registerPage.password.errors[lang] })
        }
        if (!values.confirmPassword.trim()) {
            return setErrors({ confirmPassword: Strings.registerPage.confirmPassword.errors[lang] })
        }
        if (values.password.trim() !== values.confirmPassword) {
            return setErrors({ confirmPassword: Strings.registerPage.confirmPassword.notMatch[lang] })
        }

        setLoading(true)

        const { confirmPassword, ...body } = values

        try {
            const response = await fetch(BACKEND + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            setLoading(false)
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
    }

    if (errors.general === "Failed to fetch") {
        setErrors({ msg: Strings.registerPage.submit.errors.failedToFetch[lang] })
    } else if (errors.general === "Username is already been registered") {
        setErrors({ msg: Strings.registerPage.submit.errors.usernameRegistered[lang] })
    } else if (errors.general === "E-mail is already been registered") {
        setErrors({ msg: Strings.registerPage.submit.errors.emailRegistered[lang] })
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
            <Breadcrumbs current={Strings.breadcrumbs.register[lang]} links={[
                { title: Strings.breadcrumbs.home[lang], link: '/' }
            ]} />

            <div className='registerPage flex'>
                <div className='registerContainer flex'>
                    <div className="formDiv flex">
                        <div className="headerDiv">
                            <img src={logo} alt="Logo" />
                            <h3>{Strings.registerPage.title[lang]}</h3>
                        </div>

                        <form onSubmit={onSubmit} className='form grid'>
                            <div className="inputDiv">
                                <div className="inputLabel">
                                    {Strings.registerPage.username.label[lang]}
                                    <span className='errorText'>
                                        {errors.username && Strings.registerPage.username.errors[lang]}
                                    </span>
                                </div>
                                <div className={`input flex ${errors.username ? 'inputBorder error' : 'inputBorder'}`}>
                                    <User className='icon' />
                                    <Input type="text" name='username' id='username' placeholder={Strings.registerPage.username.placeholder[lang]} value={values.username} onChange={onChange} />
                                </div>
                            </div>

                            <div className="inputDiv">
                                <div className="inputLabel">
                                    {Strings.registerPage.email.label[lang]}
                                    <span className='errorText'>
                                        {errors.email}
                                    </span>
                                </div>
                                <div className={`input flex ${errors.email ? 'inputBorder error' : 'inputBorder'}`}>
                                    <EnvelopeSimple className='icon' />
                                    <Input type="email" name='email' id='email' placeholder={Strings.registerPage.email.placeholder[lang]} value={values.email} onChange={onChange} />
                                </div>
                            </div>

                            <div className="inputDiv">
                                <div className="inputLabel">
                                    {Strings.registerPage.password.label[lang]}
                                    <span className='errorText'>
                                        {errors.password}
                                    </span>
                                </div>
                                <div className={`input flex ${errors.password ? 'inputBorder error' : 'inputBorder'}`}>
                                    <LockKey className='icon' />
                                    <Input type="password" name='password' id='password' placeholder={Strings.registerPage.password.placeholder[lang]} value={values.password} onChange={onChange} />
                                </div>
                            </div>

                            <div className="inputDiv">
                                <div className="inputLabel">
                                    {Strings.registerPage.confirmPassword.label[lang]}
                                    <span className='errorText'>
                                        {errors.confirmPassword}
                                    </span>
                                </div>
                                <div className={`input flex ${errors.confirmPassword ? 'inputBorder error' : 'inputBorder'}`}>
                                    <LockKey className='icon' />
                                    <Input type="password" name='confirmPassword' id='confirmPassword' placeholder={Strings.registerPage.confirmPassword.placeholder[lang]} value={values.confirmPassword} onChange={onChange} />
                                </div>
                            </div>

                            {loading ?
                                <Loader className="btn" /> :
                                <button type='submit' className='btn flex'>
                                    <span>{Strings.registerPage.submit.title[lang]}</span>
                                </button>
                            }

                            <span className="forgotPassword">
                                {Strings.registerPage.forgotPassword.text[lang]} <a href="#!">{Strings.registerPage.forgotPassword.click[lang]}</a>
                            </span>
                        </form>

                        {success && <Alert type="success" message={Strings.registerPage.submit.success[lang]} />}
                        {errors.msg && <Alert type="error" message={errors.msg} />}
                    </div>
                </div>
            </div>
        </>
    )
}
