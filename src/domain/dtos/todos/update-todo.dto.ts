export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly completed?: boolean
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {};

        if (this.title) returnObj.title = this.title;
        if (this.completed !== undefined) returnObj.completed = this.completed;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, title, completed } = props;

        let newCompleted = completed;

        if (!id || isNaN(id) || id < 1) {
            return ['ID must be a number greater than 0', undefined];
        }

        if (completed) {
            newCompleted = typeof completed === 'string' ? completed.toLowerCase() === 'true' : completed;

            if (typeof newCompleted !== 'boolean') {
                return ['Completed must be a boolean', undefined];
            }
        }

        return [undefined, new UpdateTodoDto(id, title, newCompleted)];
    }

}
