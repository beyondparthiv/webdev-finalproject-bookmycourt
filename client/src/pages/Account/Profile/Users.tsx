"use client";
import { useState, useEffect } from "react";
import * as client from "../client";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "./PeopleTable";
import { useNavigate } from "react-router-dom";
export default function Users() {
    const navigate = useNavigate();
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

    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className="wd-people-table">
            <h2>Users</h2>
            <button onClick={createUser}
                className="float-end btn btn-danger">
                <FaPlus className="me-2" />
                People
            </button>
            <input placeholder="Search people" onChange={
                (e) => filterUsersByName(e.target.value)}
                className="form-control float-start w-25"
            />
            <select value={role} onChange={
                (e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role" >
                <option value="">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="COURTOWNER">Court Owner</option>
                <option value="CUSTOMER">Customer</option>
            </select>
            <div className="d-flex justify-content-center">
                <PeopleTable users={users} fetchUsers={fetchUsers}/>
            </div>
        </div>
    );
}
