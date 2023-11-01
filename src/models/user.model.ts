import Model from '@/libs/model';
import { ObjectId } from 'mongodb';
import TaskModel, { Task } from '@/models/task.model';

export type User = {
    id: string;
    tasks: ObjectId[];
    events: ObjectId[];
    streaks: ObjectId[];
    settings: ObjectId;
}

export default class UserModel extends Model.create<User>('users') {
    static async addTask(id: string, task: Task) {
        const result = await TaskModel.create(task);
        await this.collection.findOneAndUpdate(
            { id },
            { $push: { tasks: result.insertedId } },
            { upsert: true }
        );
    }
    static async getTasks(id: string, filter?: Partial<{
        name: string;
        before: Date;
        after: Date;
        unscheduled: boolean;
        progress: 'not-started' | 'in-progress' | 'complete';
        shorterThan: number;
        longerThan: number;
        tags: string[];
    }>) {
        const user = await this.collection.findOne({ id });
        if (!user) return [];
        const tasks = await TaskModel.collection.find({
            _id: { $in: user.tasks }
        }).toArray();
        return tasks;
    }
}