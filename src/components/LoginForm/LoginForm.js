import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { refreshUser } from 'redux/auth/operations';
import css from 'components/LoginForm/LoginForm.module.css';

export const LoginForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        await dispatch(
            logIn({
                email: form.elements.email.value,
                password: form.elements.password.value,
            })
        );

        await dispatch(refreshUser());
        form.reset();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
            <label className={css.label}>
                Email
                <input type="email" id="email" name="email" autoComplete="email"/>
            </label>
            <label className={css.label}>
                Password
                <input type="password" id="password" name="password" />
            </label>
            <button type="submit">Log In</button>
        </form>
    );
}