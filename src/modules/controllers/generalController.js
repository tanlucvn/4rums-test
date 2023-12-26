import mongoose from 'mongoose';
import createHttpError from 'http-errors';

import User from '../models/User.js';

/**
 * [Controllers] getUsers - Hàm xử lý yêu cầu để lấy danh sách tất cả người dùng từ cơ sở dữ liệu.
 * Nó trích xuất các thông số từ query params hoặc sử dụng giá trị mặc định nếu không có giá trị.
 * Tùy thuộc vào trường sort, nó trả về danh sách người dùng được sắp xếp theo các tiêu chí khác nhau.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu gửi từ client.
 * @param {Object} res - Đối tượng response, sẽ được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 * @returns {JSON} - Trả về danh sách người dùng dưới dạng JSON theo yêu cầu.
 */
const getUsers = async (req, res, next) => {
    try {

        /** Lấy các thông số từ query params hoặc sử dụng giá trị mặc định nếu không có */
        const { limit = 10, page = 1, sort } = req.query

        let users

        /** Các trường cần lấy từ cơ sở dữ liệu */
        const select = '_id name displayName createdAt onlineAt picture role'

        /** Xử lý các trường hợp sort khác nhau */
        if (sort === 'online') {

            /** Lấy danh sách user đang online trong vòng 5 phút gần đây */
            const date = new Date()
            date.setMinutes(date.getMinutes() - 5)
            users = await User.paginate({ onlineAt: { $gte: date.toISOString() } }, { sort: { onlineAt: -1 }, page, limit, select })
        } else if (sort === 'admin') {

            /** Lấy danh sách người dùng có vai trò là 'admin' */
            users = await User.paginate({ role: 'admin' }, { sort: { onlineAt: -1 }, page, limit, select })
        } else if (sort === 'old') {

            /** Lấy danh sách người dùng theo thứ tự ngày tạo từ cũ đến mới */
            users = await User.paginate({}, { sort: { createdAt: 1 }, page, limit, select })
        } else {

            /** Mặc định lấy danh sách người dùng theo thứ tự ngày tạo mới đến cũ */
            users = await User.paginate({}, { sort: { createdAt: -1 }, page, limit, select })
        }

        /** Trả về danh sách người dùng dưới dạng JSON */
        res.json(users)
    } catch (err) {

        /** Xử lý bất kỳ lỗi nào phát sinh và chuyển tiếp tới middleware xử lý lỗi */
        next(createHttpError.InternalServerError(err))
    }
}

/**
 * [Controllers] getUser - được sử dụng để lấy thông tin cơ bản của một người dùng từ CSDL dựa trên userId.
 * Nó xử lý yêu cầu HTTP GET và trả về dữ liệu người dùng trong định dạng JSON.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu gửi từ client.
 * @param {Object} res - Đối tượng response, sẽ được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 * @returns {JSON} - Trả về thông tin cơ bản của người dùng dưới dạng JSON (id, name, displayName, createdAt, onlineAt, picture, role).
 */
const getUser = async (req, res, next) => {
    try {

        /**  Lấy userId từ query params */
        const { userId } = req.query

        /** Tìm người dùng trong cơ sở dữ liệu bằng _id (userId) */
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) })

        /** Trả về thông tin cơ bản của người dùng dưới dạng JSON */
        res.json({
            id: user._id,
            name: user.name,
            displayName: user.displayName,
            createdAt: user.createdAt,
            onlineAt: user.onlineAt,
            picture: user.picture,
            role: user.role
        })
    } catch (err) {

        /** Xử lý bất kỳ lỗi nào phát sinh và chuyển tiếp tới middleware xử lý lỗi */
        next(createHttpError.InternalServerError(err))
    }
}

export { getUsers, getUser }
