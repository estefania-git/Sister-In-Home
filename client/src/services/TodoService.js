import axios from 'axios';

class TodoService {
    constructor() {
        this.instance = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/todos`,
            withCredentials: true
        })
    }

    fetchTodos = () => {
        return this.instance.get('/')
            .then(res => Promise.resolve(res.data))
            .catch(error => console.error(error))
    }

    fetchOneTodo = (id) => {
        return this.instance.get(`/${id}`)
            .then(res => Promise.resolve(res.data))
            .catch(error => console.error(error))
    }

    createTodo = (todo) => {
        return this.instance.post('/new', todo)
            .then(res => Promise.resolve(res.data))
            .catch(error => console.error(error))
    }

    updateTodo = (id, done) => {
        return this.instance.put(`/${id}`, {
                done
            })
            .then(res => Promise.resolve(res.data))
            .catch(error => console.error(error))
    }

    deleteTodo = (id) => {
        return this.instance.delete(`/${id}`)
            .then(res => Promise.resolve(res.data))
            .catch(error => console.error(error))
    }
}

export default TodoService;
