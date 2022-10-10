class Searchable {
    constructor() {
        if (this.constructor === Searchable) {
            throw new Error('Abstract class cannot be instantiated');
        }
}