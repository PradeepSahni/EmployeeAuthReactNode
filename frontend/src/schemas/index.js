import * as Yup from 'yup'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required("Please Enter your First Name.."),
    email: Yup.string().email().required("Please Enter your email."),
    password: Yup.string().min(6).matches(passwordRegex,'Password should be strong.').required("Please Enter your Password.")
})
// signInSchema
export const signInSchema = Yup.object({
    email: Yup.string().email().required("Please Enter your email."),
    password: Yup.string().min(6).matches(passwordRegex,'Password should be strong.').required("Please Enter your Password.")
})
