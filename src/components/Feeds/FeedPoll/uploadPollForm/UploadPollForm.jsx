import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { ErrorMessage } from "./FormInputElements";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddAnswerContainer, Text, Title, QuestionBody, Button, Form } from "./UploadPollFormElements";

const ANSWER_ERROR_MSG = "Min 4 characters";
const schema = z.object({
    question: z.string().min(10, "Minimum 10 characters"),
    answer1: z.string().min(4, ANSWER_ERROR_MSG),
    answer2: z.string().min(4, ANSWER_ERROR_MSG),
    answer3: z.string().min(4, ANSWER_ERROR_MSG).optional(),
});

const MAX_ANSWERS = 3;

export const UploadPollForm = () => {
    const [answers, setAnswers] = useState([1, 2]);
    const {
        register,
        handleSubmit,
        resetField,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        shouldUnregister: true,
    });

    const isAtMaxAnswers = answers.length === MAX_ANSWERS;

    const onSubmit = (data) => {
        console.log(data);
    };

    const addAnswer = () => {
        setAnswers((prevAnswers) => [...prevAnswers, prevAnswers.length + 1]);
    };

    const removeAnswer = (index) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers.filter((_, i) => i !== index);
            const currentValues = getValues();

            if (index === 0) {
                index++;
            }

            for (let i = index; i < prevAnswers.length - 1; i++) {
                setValue(`answer${i + 1}`, currentValues[`answer${i + 2}`]);
            }

            return updatedAnswers;
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Title>Add a question</Title>
            <QuestionBody
                errorMessage={errors?.question?.message}
                placeholder="Question Body..."
                {...register("question")}
            />
            {errors?.question?.message && <ErrorMessage>{errors.question.message}</ErrorMessage>}
            <Answers
                answers={answers}
                errors={errors}
                register={register}
                removeAnswer={removeAnswer}
                isAtMaxAnswers={isAtMaxAnswers}
                resetField={resetField}
            />
            <AddAnswerContainer>
                <Text>Add another answer</Text>
                <Button disabled={isAtMaxAnswers} type="button" onClick={addAnswer}>
                    +
                </Button>
            </AddAnswerContainer>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

const Answers = ({ answers, errors, register, removeAnswer, isAtMaxAnswers, resetField }) => {
    return (
        <>
            {answers.map((answer, index) => (
                <FormInput
                    key={`${answer}-${index}`}
                    name={`answer${index + 1}`}
                    placeholder="Your Answer"
                    errors={errors}
                    resetField={() => resetField(`answer${index + 1}`)}
                    register={register}
                    removeInput={() => removeAnswer(index)}
                    deletable={isAtMaxAnswers}
                >
                    {answer}
                </FormInput>
            ))}
        </>
    );
};
