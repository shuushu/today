import './Progress'

class ProgressBuilder<T> {
    builder: T;
    constructor(classObject: T) {
        this.builder = classObject
    }
}

export { ProgressBuilder }