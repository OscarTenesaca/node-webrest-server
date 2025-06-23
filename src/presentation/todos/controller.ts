import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


export class TodoController {

    // * DI
    constructor() { }


    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) res.status(400).json({ message: 'Invalid ID' });

        if (id < 1) res.status(400).json({ message: 'ID must be greater than 0' });

        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }

    // public createTodo = async (req: Request, res: Response) => {
    public createTodo = async (req: any, res: any) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(todo);
    }


    // public updateTodo = async (req: Request, res: Response) => {
    public updateTodo = async (req: any, res: any) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        let updateTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });

        res.json(updateTodo);
    }

    // public deleteTodo = async (req: Request, res: Response) => {
    public deleteTodo = async (req: any, res: any) => {
        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        const deleted = await prisma.todo.delete({ where: { id } });

        return res.json({ todo, deleted });
    }

}
