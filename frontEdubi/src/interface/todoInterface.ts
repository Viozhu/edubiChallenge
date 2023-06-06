export interface TodoInterface {
  id: number;
  task: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoEditInterface {
  todo: TodoInterface | null;
  enabled: boolean;
}
