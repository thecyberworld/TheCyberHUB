import React from "react";
import { FormInput } from "./FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
    question1: z.string().min(1, "This field is required"),
    question2: z.string().min(1, "This field is required"),
    question3: z.string().min(1, "This field is required"),
});

export const UploadPollForm = () => {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput name="question1" placeholder="Add option" errors={errors} register={register} />
            <FormInput name="question2" placeholder="Add option" errors={errors} register={register} />
            <FormInput name="question3" placeholder="Add option" errors={errors} register={register} />
            <button type="submit">Submit</button>
        </form>
    );
};
