import { NotFoundException } from '@nestjs/common';
import { TodosService } from './todos.service';

describe('TodosService_class', () => {
  // Tests that the findAll() method returns an array of Todo objects.
  it('test_find_all_returns_array', async () => {
    const mockTodoRepository = {
      find: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          task: 'Task 1',
          completed: false,
          created_at: new Date(),
          updated_at: null,
        },
      ]),
    };
    const todosService = new TodosService(mockTodoRepository as any);
    const todos = await todosService.findAll();
    expect(todos).toEqual([
      {
        id: 1,
        task: 'Task 1',
        completed: false,
        created_at: expect.any(Date),
        updated_at: null,
      },
    ]);
    expect(mockTodoRepository.find).toHaveBeenCalledTimes(1);
  });

  // Tests that the create() method returns a Todo object with completed set to false.
  it('test_create_returns_todo_with_completed_false', async () => {
    const mockTodoRepository = {
      create: jest.fn().mockReturnValueOnce({
        id: 1,
        task: 'Task 1',
        completed: false,
        created_at: new Date(),
        updated_at: null,
      }),
      save: jest.fn().mockResolvedValueOnce({
        id: 1,
        task: 'Task 1',
        completed: false,
        created_at: expect.any(Date),
        updated_at: null,
      }),
    };

    const todosService = new TodosService(mockTodoRepository as any);
    const createTodoDto = {
      task: 'Task 1',
      created_at: new Date(),
      updated_at: null,
      id: 1,
      completed: false,
    };
    const newTodo = await todosService.create(createTodoDto);
    expect(newTodo).toEqual({
      id: 1,
      task: 'Task 1',
      completed: false,
      created_at: expect.any(Date),
      updated_at: null,
    });
    expect(mockTodoRepository.create).toHaveBeenCalledWith({
      ...createTodoDto,
      completed: false,
    });
    expect(mockTodoRepository.save).toHaveBeenCalledWith({
      id: 1,
      task: 'Task 1',
      completed: false,
      created_at: expect.any(Date),
      updated_at: null,
    });
  });

  // Tests that the update() method throws a NotFoundException if Todo with given id is not found.
  it('test_update_throws_not_found_exception_if_todo_not_found', async () => {
    const mockTodoRepository = {
      findOneBy: jest.fn().mockResolvedValueOnce(undefined),
    };
    const todosService = new TodosService(mockTodoRepository as any);
    const updateTodoDto = {
      task: 'Task 1',
      completed: true,
      id: 1,
      created_at: new Date(),
      updated_at: null,
    };
    await expect(todosService.update(1, updateTodoDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  // Tests that the findAll() method returns an empty array if no Todos are found.
  it('test_find_all_returns_empty_array_if_no_todos_found', async () => {
    const mockTodoRepository = {
      find: jest.fn().mockResolvedValueOnce([]),
    };
    const todosService = new TodosService(mockTodoRepository as any);
    const todos = await todosService.findAll();
    expect(todos).toEqual([]);
    expect(mockTodoRepository.find).toHaveBeenCalledTimes(1);
  });

  // Tests that the update() method returns a Todo object with updated_at set to current date.
  it('test_update_returns_todo_with_updated_at_set', async () => {
    const mockTodoRepository = {
      findOneBy: jest.fn().mockResolvedValueOnce({
        id: 1,
        task: 'Task 1',
        completed: false,
        created_at: new Date(),
        updated_at: null,
      }),
      save: jest.fn().mockResolvedValueOnce({
        id: 1,
        task: 'Task 1',
        completed: true,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    };
    const todosService = new TodosService(mockTodoRepository as any);
    const updateTodoDto = {
      task: 'Task 1',
      completed: true,
      id: 1,
      created_at: new Date(),
      updated_at: null,
    };
    const editedTodo = await todosService.update(1, updateTodoDto);
    expect(editedTodo).toEqual({
      id: 1,
      task: 'Task 1',
      completed: true,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockTodoRepository.save).toHaveBeenCalledWith({
      id: 1,
      task: 'Task 1',
      completed: true,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  // Tests that the delete() method returns a deleted Todo object.
  it('test_delete_returns_deleted_todo', async () => {
    const mockTodoRepository = {
      findOneBy: jest.fn().mockResolvedValueOnce({
        id: 1,
        task: 'Task 1',
        completed: false,
        created_at: new Date(),
        updated_at: null,
      }),
      remove: jest.fn().mockResolvedValueOnce({
        id: 1,
        task: 'Task 1',
        completed: false,
        created_at: expect.any(Date),
        updated_at: null,
      }),
    };
    const todosService = new TodosService(mockTodoRepository as any);
    const deletedTodo = await todosService.delete(1);
    expect(deletedTodo).toEqual({
      id: 1,
      task: 'Task 1',
      completed: false,
      created_at: expect.any(Date),
      updated_at: null,
    });
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockTodoRepository.remove).toHaveBeenCalledWith({
      id: 1,
      task: 'Task 1',
      completed: false,
      created_at: expect.any(Date),
      updated_at: null,
    });
  });
});
