import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskService from '../Services/TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAllTasks = () => {
    TaskService.getAllTasks()
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks: ', error);
      });
  };

  const deleteTask = (id) => {
    TaskService.deleteTask(id)
      .then(response => {
        console.log('Task deleted successfully');
        fetchAllTasks(); 
      })
      .catch(error => {
        console.error('Error deleting task: ', error);
      });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className='container'>
      <h2 className='text-center'>Task Data</h2>
      <Link to='/add' className='btn btn-primary mb-3'>Add Task</Link>
      <div className="row">
        {tasks.map(task => (
          <div key={task.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <div className="row mb-2">
                  <div className="col-sm-6"><strong>Description:</strong></div>
                  <div className="col-sm-6">{task.description}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-6"><strong>Status:</strong></div>
                  <div className="col-sm-6">{task.status}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-6"><strong>Due Date:</strong></div>
                  <div className="col-sm-6">{task.dueDate}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-6"><strong>User ID:</strong></div>
                  <div className="col-sm-6">{task.userId}</div>
                </div>
              </div>
              <div className="card-footer">
                <Link to={`/update/${task.id}`} className='btn btn-success mr-2'>Update</Link>
                <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
