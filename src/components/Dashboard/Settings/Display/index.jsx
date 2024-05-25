import React, { useState } from "react";
import { BiEdit, BiSearch, BiTrashAlt } from "react-icons/bi";
import "./display.css";

export default function Login() {
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
        setShowForm(false); // Hide the form after submitting
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
                            <BiEdit className="edit-icon" onClick={handleEdit} />
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
                    <BiSearch className="icon-team-page" />
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
                                    <BiTrashAlt className="delete-icon" onClick={() => handleDelete(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
