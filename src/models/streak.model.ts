import Model from '@/libs/model';

export type Streak = {
    name: string;
    description: string | null;
    lastExtended: Date | null;
    streak: number | null;
    record: number | null;
    reminder: number | null;
    tags: string[];
}

export default class StreakModel extends Model.create<Streak>('streaks') {
    
}