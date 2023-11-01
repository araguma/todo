export default class FullMap<O extends Object> extends Map<string, O> {
    constructor(
        private OCreator: new () => O
    ) {
        super();
    }
    get(key: string) {
        if(!super.has(key))
            super.set(key, new this.OCreator());
        return super.get(key) as O;
    }
}