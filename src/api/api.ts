import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

let tasks: Task[] = []

// Giả lập API GET
mock.onGet('/tasks').reply(200, tasks)

// Giả lập API POST
mock.onPost('/tasks').reply((config) => {
    const newTask = JSON.parse(config.data) as Task
    newTask.id = tasks.length + 1
    tasks.push(newTask)
    return [200, newTask]
})

export default axios