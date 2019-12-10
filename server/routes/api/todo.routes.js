const router = require('express').Router();
const Todo = require('../../models/Todo')

router.get('/', (req, res, next) => {
    Todo.find()
        .then(todos => {
            return res.status(200).json(todos)
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        })
})

router.post('/new', (req, res, next) => {
    const {
        name,
        description
    } = req.body;

    const newTodo = new Todo({
        name,
        description
    })

    newTodo.save()
        .then(todo => {
            return res.status(200).json(todo)
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Error saving new Todo'
            })
        })
})

router.get('/:id', (req, res, next) => {
    const {
        id
    } = req.params;
    Todo.findById(id)
        .then(todo => {
            return res.status(200).json(todo)
        })
        .catch(error => res.status(500).json({
            message: 'Todo not found'
        }))
})

router.put('/:id', (req, res, next) => {
    const {
        id
    } = req.params;
    Todo.findByIdAndUpdate(id, req.body)
        .then(() => {
            return res.status(200).json({
                message: `Todo ${id} updated`
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Something went wrong'
            })
        })
})

router.delete('/:id', (req, res, next) => {
    const {
        id
    } = req.params;
    Todo.findByIdAndDelete(id)
        .then(() => res.status(200).json({
            message: `Todo ${id} deleted`
        }))
        .catch(error => res.status(500).json({
            message: 'Something went wrong'
        }))
})

module.exports = router;