import createHttpError from 'http-errors';
import Board from '../models/Board.js';

const getBoards = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, pagination = true } = req.query

        let boards
        if (sort === 'popular') {
            boards = await Board.paginate({}, { sort: { threadsCount: -1, answersCount: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else if (sort === 'answersCount') {
            boards = await Board.paginate({}, { sort: { answersCount: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else if (sort === 'newestThread') {
            boards = await Board.paginate({}, { sort: { newestThread: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else if (sort === 'newestAnswer') {
            boards = await Board.paginate({}, { sort: { newestAnswer: -1 }, page, limit, pagination: JSON.parse(pagination) })
        } else {
            boards = await Board.paginate({}, { sort: { position: -1 }, page, limit, pagination: JSON.parse(pagination) })
        }

        res.json(boards)
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

const getBoard = async (req, res, next) => {
    try {
        const { name, boardId } = req.query

        let board
        if (name) {
            board = await Board.findOne({ name })
        } else if (boardId) {
            board = await Board.findById(boardId)
        } else {
            return next(createHttpError.BadRequest('Board name or boardId must not be empty'))
        }

        res.json(board)
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

const createBoard = async (req, res, next) => {
    try {
        const { name, title, body, position } = req.body
        const admin = req.payload.role === 3

        if (!admin) return next(createHttpError.Unauthorized('Action not allowed'))
        if (name.trim() === '') return next(createHttpError.BadRequest('Board name must not be empty'))
        if (title.trim() === '') return next(createHttpError.BadRequest('Board title must not be empty'))
        if (!position || !Number.isInteger(position) || position < 0) return next(createHttpError.BadRequest('Position must be number'))

        const nameUrl = name.trim().toLowerCase().substring(0, 12).replace(/[^a-z0-9-_]/g, '')

        const nameExist = await Board.findOne({ name: nameUrl })
        if (nameExist) return next(createHttpError.Conflict('Board with this short name is already been created'))

        const newBoard = new Board({
            name: nameUrl,
            title: title.trim().substring(0, 21),
            body: body.substring(0, 100),
            position,
            createdAt: new Date().toISOString(),
            threadsCount: 0,
            answersCount: 0
        })

        const board = await newBoard.save()

        res.json(board)
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

const deleteBoard = async (req, res, next) => {
    try {
        const { boardId } = req.body
        const admin = req.payload.role === 3

        if (!admin) return next(createHttpError.Unauthorized('Action not allowed'))
        if (!boardId) return next(createHttpError.BadRequest('boardId must not be empty'))

        const board = await Board.findById(boardId)
        await board.delete()

        res.json({ message: 'Board successfully deleted' })
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}

const editBoard = async (req, res, next) => {
    try {
        const { boardId, name, title, body, position } = req.body
        const admin = req.payload.role === 3

        if (!admin) return next(createHttpError.Unauthorized('Action not allowed'))
        if (!boardId) return next(createHttpError.BadRequest('boardId must not be empty'))
        if (name.trim() === '') return next(createHttpError.BadRequest('Board name must not be empty'))
        if (title.trim() === '') return next(createHttpError.BadRequest('Board title must not be empty'))
        if (!position || !Number.isInteger(position) || position < 0) return next(createHttpError.BadRequest('Position must be number'))

        const nameUrl = name.trim().toLowerCase().substring(0, 12).replace(/[^a-z0-9-_]/g, '')

        const nameExist = await Board.findOne({ name: nameUrl })
        if (nameExist) return next(createHttpError.Conflict('Board with this short name is already been created'))

        await Board.updateOne({ _id: Types.ObjectId(boardId) }, {
            name: nameUrl,
            title: title.trim().substring(0, 21),
            body: body.substring(0, 100),
            position
        })
        const board = await Board.findById(boardId)

        res.json(board)
    } catch (err) {
        next(createHttpError.InternalServerError(err))
    }
}


export { getBoards, getBoard, createBoard, deleteBoard, editBoard };
