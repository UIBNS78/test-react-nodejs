import * as yup from 'yup'

export const LoginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
})

export const CommentSchema = yup.object({
    comment: yup.string().required()
})

export const SignupSchema = yup.object({
    username: yup.string().min(4).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm: yup.string().min(8).required(),
})