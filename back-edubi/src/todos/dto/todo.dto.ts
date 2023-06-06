import { IsBoolean, IsString, IsOptional, IsDateString } from 'class-validator';
import { Todo } from 'src/todos/entities/todos.entity';

export class CreateTodoDto extends Todo {
  @IsString()
  task: string;

  @IsDateString()
  created_at: Date;
}

export class UpdateTodoDto extends Todo {
  @IsOptional()
  @IsString()
  task: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
