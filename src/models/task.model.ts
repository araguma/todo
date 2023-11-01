import Model from '@/libs/model';

export type Task = {
    name: string;
    description: string | null;
    deadline: Date | null;
    progress: number;
    estimate: number | null;
    reminder: number | null;
    link: string | null;
    tags: string[];
}

export default class TaskModel extends Model.create<Task>('tasks') {
    static create(task: Task) {
        return this.collection.insertOne(task);
    }
}