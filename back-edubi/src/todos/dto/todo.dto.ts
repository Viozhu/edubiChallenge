import { IsBoolean, IsString, IsOptional } from 'class-validator';
import { Todo } from 'src/entities/todos.entity';

export class CreateTodoDto extends Todo {
  @IsString()
  task: string;
}

export class UpdateTodoDto extends Todo {
  @IsOptional()
  @IsString()
  task: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
