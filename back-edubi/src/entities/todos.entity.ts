import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column()
  completed: boolean;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date | null;
}
