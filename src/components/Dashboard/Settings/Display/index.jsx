import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Import search icon
import "./display.css";

export default function Display() {
    const [editing, setEditing] = useState(false);
    const [teamName, setTeamName] = useState("Change your Team Name");
    const [newTeamName, setNewTeamName] = useState("");
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showOwnerForm, setShowOwnerForm] = useState(false);
    const [newOwner, setNewOwner] = useState("");
    const [teamOwners, setTeamOwners] = useState([]);
    const [newMember, setNewMember] = useState({
        name: "",
        email: "",
        activity: "",
        role: "",
    });

    const handleAddOwner = (event) => {
        event.preventDefault();
        setTeamOwners([...teamOwners, newOwner]);
        setNewOwner("");
        setShowOwnerForm(false);
    };

    const handleOwnerInputChange = (event) => {
        setNewOwner(event.target.value);
    };

    const handleAddOwnerClick = () => {
        setShowOwnerForm(true);
    };

    const handleEdit = () => {
        setEditing(true);
        setNewTeamName(teamName);
    };

    const handleSave = () => {
        setEditing(false);
        setTeamName(newTeamName);
    };

    const handleChange = (e) => {
        setNewTeamName(e.target.value);
    };

    const handleAddMemberClick = () => {
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    const handleAddMember = (event) => {
        event.preventDefault();
        setMembers([...members, newMember]);
        setNewMember({ name: "", email: "", activity: "", role: "" });
        setShowForm(false);
    };

    const handleInputChange = (event) => {
        setNewMember({ ...newMember, [event.target.name]: event.target.value });
    };

    return (
        <section className="section">
            <div className="team-name">
                {editing ? (
                    <input
                        type="text"
                        value={newTeamName}
                        onChange={handleChange}
                        autoFocus
                        className="team-name-input"
                    />
                ) : (
                    <>
                        <div className="team-name-container">
                            <h2 className="team-name-heading">{teamName}</h2>
                            <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={handleEdit} />
                        </div>
                    </>
                )}
                {editing && (
                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>
                )}
            </div>
            <div className="owner-container">
                <div className="owner-label">
                    <div className="team-owner">Team Owner: </div>
                    <button className="add-owner-button" onClick={handleAddOwnerClick}>
                        +
                    </button>
                    {showOwnerForm && (
                        <form onSubmit={handleAddOwner}>
                            <input
                                name="owner"
                                value={newOwner}
                                onChange={handleOwnerInputChange}
                                placeholder="Owner name"
                                required
                            />
                            <button type="submit">Add owner</button>
                        </form>
                    )}
                </div>
                <div className="owner-names">
                    {teamOwners.map((owner, index) => (
                        <div key={index} className="owner-name-container">
                            {owner}
                        </div>
                    ))}
                </div>
            </div>
            <div className="search-and-add">
                <div className="group">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input placeholder="Search" type="search" className="input" />
                </div>
                <button onClick={handleAddMemberClick} className="button type1">
                    <span className="btn-txt">+ Add Member</span>
                </button>
                {showForm && (
                    <form onSubmit={handleAddMember}>
                        <input
                            name="name"
                            value={newMember.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            required
                        />
                        <input
                            name="email"
                            value={newMember.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            name="activity"
                            value={newMember.activity}
                            onChange={handleInputChange}
                            placeholder="Activity"
                            required
                        />
                        <input
                            name="role"
                            value={newMember.role}
                            onChange={handleInputChange}
                            placeholder="Role"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>

            <div className="members-list">
                <table className="members-table">
                    <thead>
                        <tr className="table-header">
                            <th>Member Name</th>
                            <th>Email</th>
                            <th>Last Activity</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.activity}</td>
                                <td>{member.role}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="delete-icon"
                                        onClick={() => handleDelete(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
