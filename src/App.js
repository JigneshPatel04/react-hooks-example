import React, { useState } from 'react';
import './App.css';

import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {
  const usersData = [
    { id: 1, name: 'Cavid', username: 'China' },
    { id: 2, name: 'Virus', username: 'Spain' },
    { id: 3, name: 'Medician', username: 'India' },
  ];

  const [users, setUsers] = useState(usersData);
  const initialFormState = { id: null, name: '', username: '' };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const [editing, setEditing] = useState(false);

  const addUser = (user) => {
    // user.id = users.length + 1;
    if (!user.id) {
      let userIds = users.map((user) => user.id);
      if (userIds.length > 0) {
        user.id = Math.max(...userIds) + 1;
      } else {
        user.id = 1;
      }
    }
    setUsers([...users, user]);
  };

  const onhandleDelete = (id) => {
    const updateUsers = users.filter((user) => user.id !== id);
    setUsers(updateUsers);
  };

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));

  };

  return (
    <div className='container'>
      <h1>CRUD App with Hooks</h1>
      <div className='flex-row'>
        <div className='flex-large'>
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className='flex-large'>
          <h2>View users</h2>
          <UserTable
            users={users}
            editRow={editRow}
            onhandleDelete={onhandleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
