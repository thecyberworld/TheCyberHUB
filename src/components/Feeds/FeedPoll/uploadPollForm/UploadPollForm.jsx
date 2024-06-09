import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const schema = z.object({
    questions: z.array(z.string().min(4, "Min 4 characters")),
});

export const UploadPollForm = () => {
    const [questions, setQuestions] = useState(["Change me"]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const addQuestion = () => {
        setQuestions([...questions, ""]);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>Add a question</Title>
            <QuestionBody>aa</QuestionBody>
            {questions.map((question, index) => (
                <FormInput
                    key={index}
                    name={`questions.${index}`}
                    placeholder="Your Question"
                    errors={errors}
                    register={register}
                />
            ))}
            <AddQuestionContainer>
                <Text>Add another question</Text>
                <Button onClick={addQuestion}>+</Button>
            </AddQuestionContainer>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

const Button = styled.button`
    font-size: 14px;
    background: #333;
    color: #fff;
    border: 1px solid #555;
    border-radius: 0.2rem;
    padding: 0.5rem;
    box-shadow: 0 0 1px 1px #f5f5f569;
`;

const Form = styled.form`
    display: flex;
    background: #252525;
    width: 20rem;
    margin: auto;
    border-radius: 15px;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Text = styled.p`
    color: #fff;
    font-size: 1rem;
`;

const AddQuestionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const Title = styled.p`
    color: #fff;
    font-size: 1.5rem;
`;

const QuestionBody = styled.textarea`
    font-size: 1.2;
    background: #333;
    color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0 1px 1px #f5f5f569;
    min-height: 5rem;
    padding: 0.3rem;

    &::placeholder {
        color: #aaa;
    }
`;
