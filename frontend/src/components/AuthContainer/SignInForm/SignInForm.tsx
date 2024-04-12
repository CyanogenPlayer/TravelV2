import {Button, Form} from "react-bootstrap";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../../ErrorTextBox";
import {IUser} from "../../../interfaces";
import {signInValidator} from "../../../validators";
import {useAppDispatch} from "../../../hooks";
import {authActions} from "../../../redux";
import {useNavigate} from "react-router-dom";

interface IProp {
    authError: string,
    handleToggle: () => void
}

const SignInForm: FC<IProp> = ({authError, handleToggle}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<IUser>({
        mode: 'onBlur',
        resolver: joiResolver(signInValidator)
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signIn = async (user: IUser) => {
        await dispatch(authActions.signIn({user}))
        reset();

        navigate('/hotels')
    }

    return (
        <form>
            <h1 className="m-3 text-center">SignIn</h1>
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="enter password"
                    {...register('password')}
                />
            </Form.Group>
            {errors.password && <ErrorTextBox error={errors.password.message}/>}
            {authError && <ErrorTextBox error={authError}/>}
            <div className="mt-3 text-center">
                <p>
                    Don't have an account? {" "}
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={handleToggle}
                    >
                        SignUp
                    </Button>
                </p>
                <Button className="btn btn-block" onClick={handleSubmit(signIn)} disabled={!isValid}>
                    SignIn
                </Button>
            </div>
        </form>
    );
};

export {
    SignInForm
}