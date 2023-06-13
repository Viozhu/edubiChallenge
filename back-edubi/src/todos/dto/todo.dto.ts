import { IsBoolean, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  task: string;

  @IsDateString()
  created_at: Date;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  task: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
