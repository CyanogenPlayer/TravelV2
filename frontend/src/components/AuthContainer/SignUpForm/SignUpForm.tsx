import {Button, Form} from "react-bootstrap";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../../ErrorTextBox";
import {IUser} from "../../../interfaces";
import {signUpValidator} from "../../../validators";
import {authActions} from "../../../redux";
import {useAppDispatch} from "../../../hooks";

interface IProp {
    authError: string,
    handleToggle: () => void,
}

const SignUpForm: FC<IProp> = ({authError, handleToggle}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<IUser>({
        mode: 'onBlur',
        resolver: joiResolver(signUpValidator)
    });
    const dispatch = useAppDispatch();

    const signUp = async (user: IUser) => {
        await dispatch(authActions.signUp({user}))
        reset();

        if (authError) {
            handleToggle()
        }
    }

    return (
        <form>
            <h1 className="m-3 text-center">SignUp</h1>
            <Form.Group className="my-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter username"
                    {...register('username')}
                />
            </Form.Group>
            {errors.username && <ErrorTextBox error={errors.username.message}/>}
            <Form.Group className="my-2">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="enter email"
                    {...register('email')}
                />
            </Form.Group>
            {errors.email && <ErrorTextBox error={errors.email.message}/>}
            <Form.Group className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="enter password"
                    {...register('password')}
                />
            </Form.Group>
            {errors.password && <ErrorTextBox error={errors.password.message}/>}
            <Form.Group className="my-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="enter password again"
                    {...register('re_password')}
                />
            </Form.Group>
            {errors.re_password && <ErrorTextBox error={errors.re_password.message}/>}
            {authError && <ErrorTextBox error={authError}/>}
            <div className="mt-3 text-center">
                <p>
                    Already have an account? {" "}
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={handleToggle}
                    >
                        SignIn
                    </Button>
                </p>
                <Button className="btn btn-block" onClick={handleSubmit(signUp)} disabled={!isValid}>
                    SignUp
                </Button>
            </div>
        </form>
    );
};

export {
    SignUpForm
}