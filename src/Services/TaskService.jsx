import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:8097/api/tasks/'
class TaskService {
  getAllTasks () { // return axios.get(BASE_REST_API_URL + 'eventsList')
    const url = BASE_REST_API_URL + 'getall'
    console.log('Fetching events from:', url) // Logging the complete URL
    return axios.get(url)
  }

  createTask (task) {
    const url = BASE_REST_API_URL + 'create'
    console.log('Adding task at URL:', url)
    return axios.post(url, task)
  }

  getTaskById (id) {
    const url = BASE_REST_API_URL + 'get/' + id
    console.log('getting task at URL:', url)
    return axios.get(url)
  }

  updateTask (id, task) {
    const url = BASE_REST_API_URL + 'edit/' + id
    console.log('Udpating task at URL:', url)
    return axios.put(url, task)
  }

  deleteTask (id, task) {
    const url = BASE_REST_API_URL + 'delete/' + id
    console.log('Deleting event at URL:', url)
    return axios.delete(url, task)
  }
}
export default new TaskService()
