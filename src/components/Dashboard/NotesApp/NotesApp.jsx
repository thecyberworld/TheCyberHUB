import React from "react";
import { NoteDescription, LeftSectionContainer, TitleCard, NoteTitle, NotesAppContainer } from "./NotesAppElement";

const NotesApp = () => {
    const NotesData = [
        { id: 1, title: "javascript", description: "this is a description" },
        { id: 2, title: "react", description: "this is a description" },
        { id: 3, title: "nodejs", description: "this is a description" },
        { id: 4, title: "express", description: "this is a description" },
        { id: 5, title: "mongodb", description: "this is a description" },
    ];

    return (
        <div className="wrapper">
            <h1>Hiiiiiiiiiiiiiiii</h1>
            <NotesAppContainer>
                <LeftSectionContainer>
                    {NotesData.map((note) => (
                        <TitleCard key={note.id}>
                            <NoteTitle>{note.title}</NoteTitle>
                            <NoteDescription>{note.description}</NoteDescription>
                        </TitleCard>
                    ))}
                </LeftSectionContainer>
            </NotesAppContainer>
        </div>
    );
};

export default NotesApp;
