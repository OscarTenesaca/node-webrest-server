export class CreateTodoDto {

    private constructor(
        public readonly title: string,
        public readonly completed: boolean = false
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { title, completed } = props;

        if (!title) {
            return ['Title is required', undefined];
        }

        if (!completed || typeof completed !== 'boolean') {
            return ['Completed must be a boolean', undefined];
        }



        return [undefined, new CreateTodoDto(title)];
    }

}
