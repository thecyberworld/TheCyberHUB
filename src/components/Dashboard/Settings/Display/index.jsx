import React, { useState } from "react";
import { BiEdit, BiSearch, BiTrashAlt } from "react-icons/bi";
import styled from "styled-components";

const Section = styled.section`
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    padding-bottom: 20px;
`;

const TeamName = styled.div`
    display: flex;
    align-items: center;
    color: whitesmoke;
`;

const TeamNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TeamNameHeading = styled.h2`
    font-size: 24px;
    margin-right: 10px;
`;

const TeamNameInput = styled.input`
    color: black;
`;

const EditIcon = styled(BiEdit)`
    cursor: pointer;
    color: #fffff0;
    margin-bottom: 10px;

    &:hover {
        color: #0056b3;
    }
`;

const OwnerContainer = styled.div`
    background-color: #f5f7fa;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const OwnerLabel = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const OwnerNames = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
`;

const OwnerNameContainer = styled.div`
    border-color: #0d0c22;
    border-width: 3px;
    padding: 10px;
    border-radius: 5px;
    width: 10%;
    color: black;
    margin-right: 30px;
    text-align: center;
`;

const SearchAndAdd = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Group = styled.div`
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: 0.3s ease;

    &::placeholder {
        color: black;
    }

    &:focus,
    &:hover {
        outline: none;
        border-color: rgb(234 76 137 / 40%);
        background-color: #fff;
        box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
    }
`;

const Icon = styled(BiSearch)`
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
`;

const AddMemberButton = styled.button`
    height: 50px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #252525;
    overflow: hidden;
    border-radius: 30px;
    color: white;
    transition: all 0.5s ease-in-out;

    &:hover&::after {
        visibility: visible;
        transform: scale(100) translateX(2px);
    }

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.5s ease-in-out;
        background-color: #333;
        border-radius: 30px;
        visibility: hidden;
        height: 10px;
        width: 10px;
        z-index: -1;
    }
`;

const BtnTxt = styled.span`
    z-index: 1;
    font-weight: 800;
    letter-spacing: 4px;
`;

const MembersTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.tr`
    th {
        background-color: #f0f0f0;
        color: black;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }
`;

const TableRow = styled.tr`
    td {
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: left;
        color: black;

        &:first-child {
            border-left: none;
        }

        &:last-child {
            border-right: none;
        }
    }
`;

const DeleteIcon = styled(BiTrashAlt)`
    color: #888;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

const TeamOwner = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const AddOwnerButton = styled.button`
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    color: darkslategrey;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    input {
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 5px;
        color: black;
        border: 1px solid #ccc;
    }

    button {
        padding: 8px;
        border: none;
        background-color: #333;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }
`;

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
        setShowForm(false);
    };

    const handleInputChange = (event) => {
        setNewMember({ ...newMember, [event.target.name]: event.target.value });
    };

    return (
        <Section>
            <TeamName>
                {editing ? (
                    <TeamNameInput type="text" value={newTeamName} onChange={handleChange} autoFocus />
                ) : (
                    <TeamNameContainer>
                        <TeamNameHeading>{teamName}</TeamNameHeading>
                        <EditIcon onClick={handleEdit} />
                    </TeamNameContainer>
                )}
                {editing && <button onClick={handleSave}>Save</button>}
            </TeamName>
            <OwnerContainer>
                <OwnerLabel>
                    <TeamOwner>Team Owner: </TeamOwner>
                    <AddOwnerButton onClick={handleAddOwnerClick}>+</AddOwnerButton>
                    {showOwnerForm && (
                        <Form onSubmit={handleAddOwner}>
                            <input
                                name="owner"
                                value={newOwner}
                                onChange={handleOwnerInputChange}
                                placeholder="Owner name"
                                required
                            />
                            <button type="submit">Add owner</button>
                        </Form>
                    )}
                </OwnerLabel>
                <OwnerNames>
                    {teamOwners.map((owner, index) => (
                        <OwnerNameContainer key={index}>{owner}</OwnerNameContainer>
                    ))}
                </OwnerNames>
            </OwnerContainer>
            <SearchAndAdd>
                <Group>
                    <Icon />
                    <Input placeholder="Search" type="search" />
                </Group>
                <AddMemberButton onClick={handleAddMemberClick} className="button type1">
                    <BtnTxt>+ Add Member</BtnTxt>
                </AddMemberButton>
                {showForm && (
                    <Form onSubmit={handleAddMember}>
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
                    </Form>
                )}
            </SearchAndAdd>
            <MembersTable>
                <thead>
                    <TableHeader>
                        <th>Member Name</th>
                        <th>Email</th>
                        <th>Last Activity</th>
                        <th>Role</th>
                        <th>Action</th>
                    </TableHeader>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <TableRow key={index}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.activity}</td>
                            <td>{member.role}</td>
                            <td>
                                <DeleteIcon onClick={() => handleDelete(index)} />
                            </td>
                        </TableRow>
                    ))}
                </tbody>
            </MembersTable>
        </Section>
    );
}
