/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';
import { ImCross, ImCheckmark } from 'react-icons/im';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listUsers, deleteUser } from '../../actions/userActions';

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => {
    return state.userList;
  });

  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => {
    return state.userLogin;
  });

  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => {
    return state.userDelete;
  });

  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?'))
      dispatch(deleteUser(id));
  };
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <IconContext.Provider
                        value={{
                          size: '1.2em',
                          color: '#7EC8E3',
                        }}
                      >
                        <ImCheckmark />
                      </IconContext.Provider>
                    ) : (
                      <IconContext.Provider
                        value={{
                          size: '1.2em',
                          color: '#FD9096',
                        }}
                      >
                        <ImCross />
                      </IconContext.Provider>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button
                        disabled={userInfo.name === user.name}
                        className="btn-sm"
                        variant="light"
                      >
                        <IconContext.Provider
                          value={{
                            size: '1.2em',
                            color: 'black',
                          }}
                        >
                          <FaUserEdit />
                        </IconContext.Provider>
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      disabled={userInfo.name === user.name}
                      onClick={() => {
                        return deleteHandler(user._id);
                      }}
                    >
                      <IconContext.Provider
                        value={{
                          size: '1.2em',
                          color: 'white',
                        }}
                      >
                        <AiFillDelete />
                      </IconContext.Provider>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
