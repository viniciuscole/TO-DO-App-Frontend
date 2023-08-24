import Task from "./task";
export default interface List {
    _id: string;
    list: string;
    tasks: Task[];
    date: Date;
}
