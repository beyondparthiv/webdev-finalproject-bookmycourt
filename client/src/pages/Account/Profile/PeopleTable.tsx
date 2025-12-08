"use client";
import { Table, Button } from "react-bootstrap";
import { FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import * as client from "../client";
import "../Account.css";

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: any[];
  fetchUsers: () => void;
}) {
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<any>(null);

  const startEdit = (user: any) => {
    setEditingUserId(user._id);
    setEditedUser({ ...user });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  const saveEdit = async () => {
    try {
      await client.updateUser(editedUser);
      setEditingUserId(null);
      setEditedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  const deleteUser = async (userId: string, username: string) => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) {
      return;
    }

    try {
      await client.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="wd-people-table">
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              {editingUserId === user._id ? (
                // Edit Mode
                <>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-1"
                      value={editedUser.firstName || ""}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editedUser.lastName || ""}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Last Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editedUser.username || ""}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          username: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      value={editedUser.email || ""}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={editedUser.role || "CUSTOMER"}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, role: e.target.value })
                      }
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="COURTOWNER">Court Owner</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="text-nowrap">
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={saveEdit}
                    >
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                // View Mode
                <>
                  <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-4 text-secondary" />
                    <span>{user.firstName} </span>
                    <span>{user.lastName}</span>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email || "N/A"}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="text-nowrap">
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => startEdit(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteUser(user._id, user.username)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}