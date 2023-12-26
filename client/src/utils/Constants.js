const BACKEND = 'http://localhost:8000'


/**
 * PREFIX
 * %userdpname% - User display name
 */
const Strings = {
    'header': {
        'welcome': {
            'title': {
                'loggedIn': {
                    vi: 'Chào mừng đến 4rums!',
                    en: 'Welcome to 4rums!'
                },
                'notLogged': {
                    vi: 'Chào mừng đến 4rums!',
                    en: 'Welcome to 4rums!'
                }
            },
            'desc': {
                'loggedIn': {
                    vi: 'Xin chào %userdpname%, chào mừng quay trở lại!',
                    en: 'Hello %userdpname%, Welcome back!'
                },
                'notLogged': {
                    vi: 'Đăng nhập để sử dụng nhiều tính năng hơn!',
                    en: 'Please login to use more features!'
                }
            }
        },
        'search': {
            vi: 'Tìm kiếm...',
            en: 'Search boards...'
        }
    },
    'dropdown': {
        'profiles': {
            vi: 'Hồ Sơ',
            en: 'Profiles',
        },
        'settings': {
            vi: 'Cài Đặt',
            en: 'Settings',
        },
        'changeThemes': {
            vi: 'Đổi Nền',
            en: 'Change Themes',
        },
        'changeLanguages': {
            vi: 'Đổi Ngôn Ngữ',
            en: 'Change Languagues',

            'choosed': {
                vi: {
                    vi: 'Tiếng Việt',
                    en: 'Tiếng Anh'
                },
                en: {
                    vi: 'Vietnamese',
                    en: 'English'
                }
            }
        },
        'logout': {
            vi: 'Đăng Xuất',
            en: 'Logout'
        }
    },
    'sidebar': {
        'quickMenu': {
            vi: 'THAO TÁC NHANH',
            en: 'QUICK MENU',

            'home': {
                vi: 'Trang Chính',
                en: 'Home'
            },
            'boards': {
                vi: 'Bài đăng',
                en: 'All Boards'
            },
            'resources': {
                vi: 'Tài Nguyên',
                en: 'Resources'
            },
            'members': {
                vi: 'Thành Viên',
                en: 'All Users'
            }
        },
        'others': {
            vi: 'DANH MỤC KHÁC',
            en: 'OTHER CATEGORIES',

            'accounts': {
                vi: 'Tài Khoản',
                en: 'Accounts'
            }
        }
    },
    'breadcrumbs': {
        'home': {
            vi: 'Trang chính',
            en: 'Home'
        },
        'login': {
            vi: 'Đăng nhập',
            en: 'Login'
        },
        'register': {
            vi: 'Đăng ký',
            en: 'Register'
        },
    },
    'loginPage': {
        'title': {
            vi: 'Chào mừng bạn quay trở lại!',
            en: 'Welcome Back!'
        },
        'username': {
            'label': {
                vi: 'Tên người dùng',
                en: 'Username',
            },
            'placeholder': {
                vi: 'Nhập tên người dùng...',
                en: 'Type username...',
            },
            'errors': {
                vi: 'Chưa nhập tên người dùng',
                en: 'Enter your username'
            }
        },
        'password': {
            'label': {
                vi: 'Mật khẩu',
                en: 'Password',
            },
            'placeholder': {
                vi: 'Nhập mật khẩu...',
                en: 'Type password...',
            },
            'errors': {
                vi: 'Chưa nhập mật khẩu',
                en: 'Enter your password'
            }
        },
        'forgotPassword': {
            'text': {
                vi: 'Quên mật khẩu?',
                en: 'Forgot your password?'
            },
            'click': {
                vi: 'Nhấp tại đây',
                en: 'Click here'
            }
        },
        'submit': {
            'title': {
                vi: 'Đăng nhập',
                en: 'Login'
            },
            'errors': {
                'notValid': {
                    vi: 'Tên người dùng hoặc mật khẩu không hợp lệ',
                    en: 'Username or password not valid'
                },
                'failedToFetch': {
                    vi: 'Lỗi kết nối với máy chủ',
                    en: 'Error connecting to server'
                }
            },
            'success': {
                vi: 'Đăng nhập thành công',
                en: 'Logged in successfully'
            }
        }
    },
    'registerPage': {
        'title': {
            vi: 'Chào mừng bạn quay trở lại!',
            en: 'Welcome Back!'
        },
        'username': {
            'label': {
                vi: 'Tên người dùng',
                en: 'Username',
            },
            'placeholder': {
                vi: 'Nhập tên người dùng...',
                en: 'Type username...',
            },
            'errors': {
                vi: 'Chưa nhập tên người dùng',
                en: 'Enter your username'
            }
        },
        'email': {
            'label': {
                vi: 'Email',
                en: 'Email',
            },
            'placeholder': {
                vi: 'Nhập email...',
                en: 'Type email...',
            },
            'errors': {
                vi: 'Chưa nhập email',
                en: 'Enter your email'
            }
        },
        'password': {
            'label': {
                vi: 'Mật khẩu',
                en: 'Password',
            },
            'placeholder': {
                vi: 'Nhập mật khẩu...',
                en: 'Type password...',
            },
            'errors': {
                vi: 'Chưa nhập mật khẩu',
                en: 'Enter your password'
            }
        },
        'confirmPassword': {
            'label': {
                vi: 'Nhập lại mật khẩu',
                en: 'Repeat Password',
            },
            'placeholder': {
                vi: 'Nhập lại mật khẩu...',
                en: 'Type repeat password...',
            },
            'errors': {
                vi: 'Chưa nhập lại mật khẩu',
                en: 'Enter repeat password'
            },
            'notMatch': {
                vi: 'Không trùng khớp',
                en: 'Password not match'
            }
        },
        'forgotPassword': {
            'text': {
                vi: 'Quên mật khẩu?',
                en: 'Forgot your password?'
            },
            'click': {
                vi: 'Nhấp tại đây',
                en: 'Click here'
            }
        },
        'submit': {
            'title': {
                vi: 'Đăng ký',
                en: 'Register'
            },
            'errors': {
                'failedToFetch': {
                    vi: 'Lỗi kết nối với máy chủ',
                    en: 'Error connecting to server'
                },
                'usernameRegistered': {
                    vi: 'Tên người dùng đã được đăng ký',
                    en: 'Username is already been registered'
                },
                'emailRegistered': {
                    vi: 'Email đã được đăng ký',
                    en: 'Email is already been registered'
                }
            },
            'success': {
                vi: 'Đăng nhập thành công',
                en: 'Logged in successfully'
            }
        }
    }
}

export { BACKEND, Strings };