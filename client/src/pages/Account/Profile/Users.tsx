"use client";
import { useState, useEffect } from "react";
import * as client from "../client";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "./PeopleTable";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "Jane",
      lastName: `Doe${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      role: "CUSTOMER",
    });
    setUsers([...users, user]);
  };

  const filterUsers = async (newRole?: string, newName?: string) => {
    const searchRole = newRole !== undefined ? newRole : role;
    const searchName = newName !== undefined ? newName : name;

    if (!searchRole && !searchName) {
      fetchUsers();
      return;
    }

    try {
      const filteredUsers = await client.findUsersByRoleAndName(
        searchRole,
        searchName
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error filtering users:", error);
    }
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    filterUsers(newRole, undefined);
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    filterUsers(undefined, newName);
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-people-table">
      <h2>Users</h2>
      <div className="users-controls">
        <button onClick={createUser} className="btn btn-danger">
          <FaPlus className="me-2" />
          People
        </button>
        <input
          placeholder="Search people"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="form-control"
        />
        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="form-select wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="COURTOWNER">Court Owner</option>
          <option value="CUSTOMER">Customer</option>
        </select>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}