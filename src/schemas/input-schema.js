import * as yup from 'yup'

export const LoginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
})

export const CommentSchema = yup.object({
    comment: yup.string().required()
})

export const SignupSchema = yup.object({
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
    password: yup.string().min(8).required(),
    confirm: yup.string().min(8).required(),
})

export const UpdateSchema = yup.object({
    username: yup.string().min(4).required(),
    email: yup.string().email().required(),
})

export const UpdatePassSchema = yup.object({
    oldPassword: yup.string().min(8).required(),
    newPassword: yup.string().min(8).required(),
    confirm: yup.string().min(8).required(),
})

export const NewCarSchema = yup.object({
    name: yup.string().required(),
    autonomy: yup.string().required(),
    power: yup.string().required(),
    reload: yup.string().required(),
})