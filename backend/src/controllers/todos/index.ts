import { Request, Response } from 'express';
import { ITodo } from '../../types/todo';
import Todo from '../../models/todo';

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status } = req.body;
    const todo: ITodo = new Todo({
      name,
      description,
      status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(id, body);
    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: 'Todo updated',
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(id);
    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
