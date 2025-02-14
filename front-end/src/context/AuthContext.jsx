import { createContext, useState, useCallback, useContext } from "react";
import { POST } from "../api";
import { SERVICE } from "../enum/service";
import validator from 'validator';
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../api/firebase_google";
import { MessageContext } from "./MessageContext.jsx";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const { showMessage } = useContext(MessageContext);
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChangeValue = useCallback((e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    });

    const handleLogin = useCallback(async () => {
        // Check if form is not null
        if (!form || !form.email || !form.password) {
            showMessage('Please fill in all information', "error");
            return;
        }

        // Validate email
        if (!validator.isEmail(form.email)) {
            showMessage('Invalid email address', "error");
            return;
        }

        // Validate password
        if (form.password.length < 6) {
            showMessage('Password must be at least 6 characters', "error");
            return;
        }

        try {
            setLoading(true);
            const response = await POST(`${SERVICE.AUTH}/authentication/login`, { ...form });

            if(response.error){
                setLoading(false);
                showMessage(response.message, "error");
                return;
            }

            const temp = { ...response.data.user };
            setUser({ ...temp });
            localStorage.setItem("user", JSON.stringify(temp));
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            setLoading(false);
            window.location.href = "/dashboard";
        } catch (error) {
            showMessage('Login failed', "error");
        }
    });

    const handleLoginGoogle = useCallback(async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            const data = {
                user,
                idToken
            }
            const response = await POST(`${SERVICE.AUTH}/authorization/google/verify`, { ...data });
            if (response.error) {
                showMessage(response.message, "error");
                return;
            }

            const temp = { ...response.data.user };
            setUser({ ...temp });
            localStorage.setItem("user", JSON.stringify(temp));
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            window.location.href = "/dashboard";
        } catch (error) {
            throw new Error('Authentication failed');
        }
    });

    const handleResetPW = useCallback(async () => {
        // Check if form is not null
        if (!form || !form.email) {
            showMessage('Please fill in all information', "error");
            return;
        }

        // Validate email
        if (!validator.isEmail(form.email)) {
            showMessage('Invalid email address', "error");
            return;
        }

        try {
            setLoading(true);
            const response = await POST(`${SERVICE.AUTH}/authentication/reset-password`, { ...form });
            if (response.error) {
                setLoading(false);
                showMessage(response.message, "error");
                return;
            }
            setLoading(false);
            window.location.href = "/login";
        } catch (error) {
            showMessage(`Reset password failed | ${error.message}`, "error");
        }
    });

    const handleChangePW = useCallback(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('jwt');
        // Check if form is not null
        if (!form || !form.password || !form.confirm_password) {
            showMessage('Please fill in all information', "error");
            return;
        }

        // Validate password
        if (!validator.isLength(form.password, { min: 6, max: 128 })) {
            showMessage("Password must be between 6 and 128 characters", "error");
            return;
        }

        if (!/[a-z]/.test(form.password)) {
            showMessage("Password must include at least one lowercase letter", "error");
            return;
        }

        if (!/[A-Z]/.test(form.password)) {
            showMessage("Password must include at least one uppercase letter", "error");
            return;
        }

        if (!/[0-9]/.test(form.password)) {
            showMessage("Password must include at least one number", "error");
            return;
        }

        if (!/[^A-Za-z0-9]/.test(form.password)) {
            showMessage("Password must include at least one special character", "error");
            return;
        }

        // Check confirm password
        if (form.password !== form.confirm_password) {
            showMessage("Password and confirm password do not match", "error");
            return;
        }

        try {
            const response = await POST(`${SERVICE.AUTH}/authentication/rst-pwd/renew`, { ...form, token });
            if (response.error) {
                showMessage(response.message, "error");
                return;
            }
            window.location.href = "/login";
        } catch (error) {
            showMessage(`Change password failed | ${error.message}`, "error");
        }
    });

    const handleRegister = useCallback(async () => {
        // Check if form is not null
        if (!form || !form.email || !form.password || !form.confirm_password) {
            showMessage('Please fill in all information', "error");
            return;
        }

        // Validate email
        if (!validator.isEmail(form.email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        // Validate password
        if (!validator.isLength(form.password, { min: 6, max: 128 })) {
            showMessage("Password must be between 6 and 128 characters", "error");
            return;
        }
        if (!/[a-z]/.test(form.password)) {
            showMessage("Password must include at least one lowercase letter", "error");
            return;
        }
        if (!/[A-Z]/.test(form.password)) {
            showMessage("Password must include at least one uppercase letter", "error");
            return;
        }
        if (!/[0-9]/.test(form.password)) {
            showMessage("Password must include at least one number", "error");
            return;
        }
        if (!/[^A-Za-z0-9]/.test(form.password)) {
            showMessage("Password must include at least one special character", "error");
            return;
        }

        // Check confirm password
        if (form.password !== form.confirm_password) {
            showMessage("Password and confirm password do not match", "error");
            return;
        }

        try {
            const response = await POST(`${SERVICE.AUTH}/authentication/register`, { ...form });
            if (response.error) {
                showMessage(response.message, "error");
                return;
            }
            window.location.href = "/login";
        } catch (error) {
            showMessage('Register failed');
        }
    });

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
    });
    return <AuthContext.Provider
        value={{
            user,
            handleChangeValue,
            handleLogin,
            handleRegister,
            handleResetPW,
            handleChangePW,
            handleLogout,
            handleLoginGoogle,
            loading
        }}
    >
        {children}
    </AuthContext.Provider>
}