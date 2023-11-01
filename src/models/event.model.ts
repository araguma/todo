import Model from '@/libs/model';

export type Event = {
    name: string;
    description: string | null;
    start: Date | null;
    end: Date | null;
    location: string | null;
    reminder: number | null;
    tags: string[];
}

export default class EventModel extends Model.create<Event>('events') {

}