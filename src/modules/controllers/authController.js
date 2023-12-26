import { registerSchema, loginSchema } from '../utils/validationSchema.js';
import { signAccessToken } from '../utils/jwt.js';
import createHttpError from 'http-errors';

import User from '../models/User.js';

/**
 * register - Xử lý quá trình đăng ký người dùng mới.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu từ client.
 * @param {Object} res - Đối tượng response, được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 */
const register = async (req, res, next) => {
    try {

        /** Validation dữ liệu đầu vào từ request body bằng registerSchema */
        const result = await registerSchema.validateAsync(req.body)

        /** Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa */
        const emailDoesExist = await User.findOne({ email: result.email })
        if (emailDoesExist) {

            /** Nếu email đã tồn tại, ném lỗi Conflict */
            throw createHttpError.Conflict('E-mail is already been registered')
        }

        /** Chuyển đổi username thành chữ thường và kiểm tra xem đã tồn tại trong cơ sở dữ liệu chưa */
        const username = result.username.toLowerCase()
        const userNamedoesExist = await User.findOne({ name: username })
        if (userNamedoesExist) {

            /** Nếu username đã tồn tại, ném lỗi Conflict */
            throw createHttpError.Conflict('Username is already been registered')
        }

        /** Tạo một instance User mới dựa trên dữ liệu đã validate và lưu vào CSDL */
        const user = new User({
            name: username,
            displayName: result.username,
            email: result.email,
            password: result.password,
            createdAt: new Date().toISOString(),
            onlineAt: new Date().toISOString(),
            role: '1'
        })
        const savedUser = await user.save()

        /** Tạo access token cho người dùng đã lưu */
        const accessToken = await signAccessToken(savedUser)

        /** Trả về thông tin của người dùng đã lưu và access token dưới dạng JSON */
        res.json({
            user: {
                id: savedUser._id,
                name: savedUser.name,
                displayName: savedUser.displayName,
                picture: savedUser.picture,
                role: savedUser.role
            },
            accessToken
        })
    } catch (error) {

        /** Đặt status là 422 nếu là lỗi validation từ Joi */
        if (error.isJoi === true) error.status = 422
        next(error)
    }
}

/**
 * login - Xử lý quá trình đăng nhập.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu từ client.
 * @param {Object} res - Đối tượng response, được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 */
const login = async (req, res, next) => {
    try {
        const result = await loginSchema.validateAsync(req.body)

        const username = result.username.toLowerCase()
        const user = await User.findOne({ name: username })
        if (!user) throw createHttpError.NotFound('User not registered')

        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createHttpError.Unauthorized('Username or password not valid')

        const accessToken = await signAccessToken(user)

        res.json({
            user: {
                id: user._id,
                name: user.name,
                displayName: user.displayName,
                picture: user.picture,
                role: user.role
            },
            accessToken
        })
    } catch (error) {
        if (error.isJoi === true) {
            return next(createHttpError.BadRequest('Invalid username or password'))
        }
        next(error)
    }
}

export { register, login }
