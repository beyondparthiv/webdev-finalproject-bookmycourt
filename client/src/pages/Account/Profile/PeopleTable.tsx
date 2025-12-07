"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "../Account.css";
export default function PeopleTable({ users = [], fetchUsers }:
    { users?: any[]; fetchUsers: () => void }
) {
    const [showUserId, setShowUserId] = useState<string | null>(null);
    return (
        <div className="mx-auto" style={{ display: 'inline-block' }}>
            <Table striped>
                <thead>
                    <tr><th>Name</th><th>Role</th></tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <span className="text-decoration-none"
                                    onClick={() => setShowUserId(user._id)}>
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span>{user.firstName} </span>
                                    <span>{user.lastName}</span>
                                </span>
                            </td>
                            <td className="wd-role">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}