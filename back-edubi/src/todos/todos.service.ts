import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todos.entity';

import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { validate } from 'class-validator';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly TodoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.TodoRepository.find();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    // Validate the data
    const createTodoDtoValidator = new CreateTodoDto();
    createTodoDtoValidator.task = createTodoDto.task;

    validate(createTodoDtoValidator).then((errors) => {
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    });

    const newTodo = this.TodoRepository.create({
      ...createTodoDto,
      completed: false,
      created_at: new Date(),
    });
    return this.TodoRepository.save(newTodo);
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const todo = await this.TodoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    const editedTodo = Object.assign(todo, {
      ...updateTodoDto,
      updated_at: new Date(),
    });
    return this.TodoRepository.save(editedTodo);
  }

  async delete(id: number): Promise<Todo | undefined> {
    const todo = await this.TodoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return this.TodoRepository.remove(todo);
  }
}
