import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import multer from 'multer';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import User from '../models/User.js';

/** Lấy đường dẫn của file hiện tại và thư mục của nó */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Kiểm tra loại file tải lên có phải là ảnh không */
const checkFileType = (file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) return callback(null, true)
    else callback('It\'s not image', false)
}

/**
 * storage - Tạo cấu hình lưu trữ cho Multer để định nghĩa nơi lưu trữ và tên file của ảnh được tải lên.
 * @param {String} dest - Thư mục đích để lưu trữ file ảnh (vd: 'users').
 * @param {String} name - Tiền tố tên file ảnh (vd: 'picture').
 * @returns {Object} - Trả về một đối tượng diskStorage của Multer với cấu hình địa chỉ lưu trữ và đặt tên file.
 */
const storage = (dest, name) => {
    return multer.diskStorage({
        destination: path.join(__dirname, '..', '..', '..', 'public', dest),
        filename: (req, file, callback) => {

            /** Tạo hay nói cách khác là Đổi tên file với tiền tố, thời gian và phần mở rộng của file gốc */
            callback(null, name + '_' + Date.now() + path.extname(file.originalname))
        }
    })
}

/**
 * upload - Sử dụng Multer để xử lý việc tải lên file ảnh.
 * @param {Object} req - Đối tượng request, chứa thông tin về yêu cầu gửi từ client.
 * @param {Object} res - Đối tượng response, sẽ được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 */
const upload = multer({
    // Cấu hình lưu trữ và đặt tên file cho ảnh tải lên 
    storage: storage('users', 'picture'),
    // Giới hạn kích thước file 8Mb
    limits: { fileSize: 1048576 * 8 }, // 8Mb
    // Kiểm tra loại file
    fileFilter: (req, file, callback) => checkFileType(file, callback)
}).single('picture') // Đảm bảo chỉ có một file tải lên với key là 'picture'

/**
 * getProfile - Lấy thông tin profile của người dùng.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu từ client.
 * @param {Object} res - Đối tượng response, được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 * @returns {JSON} - Trả về thông tin dưới dạng JSON
 */
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.payload.id) })
        res.json({
            id: user._id,
            name: user.name,
            displayName: user.displayName,
            email: user.email,
            createdAt: user.createdAt,
            onlineAt: user.onlineAt,
            picture: user.picture,
            role: user.role
        })
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

/**
 * uploadUserPicture - Tải lên và cập nhật ảnh người dùng.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu từ client.
 * @param {Object} res - Đối tượng response, sẽ được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 * @returns {JSON} - Trả về thông tin dưới dạng JSON
 */
const uploadUserPicture = (req, res, next) => {
    try {
        upload(req, res, (err) => {
            if (err) return next(createHttpError.BadRequest(err))

            if (req.file) {
                sharp(req.file.path)
                    .resize(300, 300)
                    .toBuffer()
                    .then(async data => {
                        fs.writeFileSync(req.file.path, data)
                        const picture = { picture: `${process.env.BACKEND}/users/${req.file.filename}` }

                        await User.updateOne({ _id: mongoose.Types.ObjectId(req.payload.id) }, picture)

                        res.json(picture)
                    })
                    .catch(err => {
                        // Xử lý lỗi nếu có vấn đề trong quá trình xử lý ảnh
                        next(createHttpError.InternalServerError())
                    })
            } else {
                // Nếu không có file được tải lên, trả về lỗi BadRequest
                next(createHttpError.BadRequest())
            }
        })
    } catch (err) {
        next(err)
    }
}


/**
 * setOnline - Cập nhật trạng thái online của người dùng.
 * @param {Object} req - Đối tượng request, chứa thông tin yêu cầu từ client.
 * @param {Object} res - Đối tượng response, được sử dụng để gửi phản hồi về client.
 * @param {Function} next - Middleware tiếp theo để xử lý trong chuỗi middleware.
 */
const setOnline = async (req, res, next) => {
    try {
        await User.updateOne({ _id: mongoose.Types.ObjectId(req.payload.id) }, { onlineAt: new Date().toISOString() })
        res.json({ success: true })
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

export { getProfile, uploadUserPicture, setOnline }
