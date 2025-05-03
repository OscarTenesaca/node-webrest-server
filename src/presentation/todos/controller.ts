import { Request, Response } from "express";


let todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
]


export class TodoController {

    // * DI
    constructor() { }


    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) res.status(400).json({ message: 'Invalid ID' });

        if (id < 1) res.status(400).json({ message: 'ID must be greater than 0' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }

    public createTodo = (req: Request, res: Response) => {
        const { title, completed } = req.body;

        if (!title) {
            res.status(400).json({ message: 'Title is required' });
        }
        const newTodo = {
            id: todos.length + 1,
            title,
            completed: completed || false
        }
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const { title, completed } = req.body;

        if (isNaN(id)) res.status(400).json({ message: 'Invalid ID' });

        if (id < 1) res.status(400).json({ message: 'ID must be greater than 0' });

        let todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }

        todo.title = title || todo.title;
        todo.completed = completed || todo.completed;

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) res.status(400).json({ message: 'Invalid ID' });

        if (id < 1) res.status(400).json({ message: 'ID must be greater than 0' });

        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            res.status(404).json({ message: 'Todo not found' });
        }

        todos.splice(todoIndex, 1);
        res.status(204).send();
    }

}
