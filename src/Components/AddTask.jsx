import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TaskService from '../Services/TaskService';

export const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do'); // Default status
  const [userId, setUserId] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const changeTitle = () => {
    if (id) {
      console.log('Returned title for updating task with ID:', id);
      return <h2 className='text-center'>Update Task</h2>;
    } else {
      console.log('No task ID provided, adding new task');
      return <h2 className='text-center'>Add Task</h2>;
    }
  };

  useEffect(() => {
    console.log('useEffect triggered with ID:', id);
    if (id) {
      TaskService.getTaskById(id)
        .then((response) => {
          console.log('Response received from getTaskById API:', JSON.stringify(response.data));
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(response.data.dueDate); 
          setStatus(response.data.status);
          setUserId(response.data.userId); 
          if (response.data.status === 'Done') {
            // Set completed date to current date and time
            setCompletedDate(new Date().toISOString());
          }
        })
        .catch((error) => {
          console.error('Error retrieving task:', error);
        });
    }
  }, [id]);

  const saveOrUpdateTask = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !description || !dueDate || !status || !userId) {
      alert('All fields are required!');
      return;
    }

    // Conditionally set completion date if status is 'Done'
    const task = {
      title,
      description,
      dueDate,
      status,
      userId,
      completedDate: status === 'Done' ? new Date().toISOString() : '' // Set current date and time if status is 'Done'
    };

    console.log('Task object received from form:', task);

    if (id) {
      TaskService.updateTask(id, task)
        .then((response) => {
          console.log('Response received from update API:', JSON.stringify(response.data));
          navigate('/');
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    } else {
      TaskService.createTask(task)
        .then((response) => {
          console.log('Response received from save API:', JSON.stringify(response.data));
          navigate('/');
        })
        .catch((error) => {
          console.error('Error saving task:', error);
        });
    }
  };

  return (
    <div>
      <div className='container'>
        <div className='card col-md-6 offset-md-3'>
          {changeTitle()}
          <div className='card-body'>
            <form onSubmit={saveOrUpdateTask}>
              <div className='form-group'>
                <label>Title</label>
                <input
                  type='text'
                  className='form-control'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Description</label>
                <textarea
                  className='form-control'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className='form-group'>
                <label>Due Date</label>
                <input
                  type='date'
                  className='form-control'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Status</label>
                <select
                  className='form-control'
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    if (e.target.value === 'Done') {
                      setCompletedDate(new Date().toISOString()); // Set current date and time if status is 'Done'
                    } else {
                      setCompletedDate(''); // Reset completed date if status changes
                    }
                  }}
                  required
                >
                  <option value='To Do'>To Do</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Done'>Done</option>
                </select>
              </div>

              {status === 'Done' && (
                <div className='form-group'>
                  <label>Completed Date</label>
                  <input
                    type='text'
                    className='form-control'
                    value={completedDate}
                    disabled={true} // Disable editing of completed date
                    required
                  />
                </div>
              )}

              <div className='form-group'>
                <label>User ID</label>
                <input
                  type='text'
                  className='form-control'
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>

              <button type='submit' className='btn btn-success'>
                Save Task
              </button>
              <Link to='/' className='btn btn-danger ms-2'>
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
