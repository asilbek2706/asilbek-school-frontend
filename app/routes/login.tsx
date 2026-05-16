import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthShell, {
    AuthField,
    authButtonClass,
    authInputClass,
    authSecondaryButtonClass,
} from "./login/AuthShell";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialState = location.state as
        | {
              message?: string;
              fullname?: string;
              email?: string;
          }
        | null;

    const [form, setForm] = useState({
        fullname: initialState?.fullname ?? "",
        email: initialState?.email ?? "",
    });

    const [errors, setErrors] = useState({
        fullname: "",
        email: "",
    });

    const message = (location.state as { message?: string } | null)?.message;

    const validate = () => {
        const nextErrors = {
            fullname: "",
            email: "",
        };

        if (!form.fullname.trim()) {
            nextErrors.fullname = "Ism familiya kiritish majburiy";
        } else if (form.fullname.trim().length < 3) {
            nextErrors.fullname = "Kamida 3 ta belgi kiriting";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email kiritish majburiy";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            nextErrors.email = "Email noto‘g‘ri formatda";
        }

        setErrors(nextErrors);

        return Object.values(nextErrors).every((error) => !error);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        console.log(form);

        // backendga request
        // emailga code yuboriladi

        navigate("/login/verify", {
            state: {
                fullname: form.fullname.trim(),
                email: form.email.trim(),
            },
        });
    };

    return (
        <AuthShell
            title="Login"
            description="Email orqali tizimga kiring"
            alert={
                message ? (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        {message}
                    </div>
                ) : null
            }
            footer={
                <button
                    onClick={() => navigate("/login/register")}
                    className={authSecondaryButtonClass}
                >
                    Akkount yo‘qmi? Ro‘yxatdan o‘ting
                </button>
            }
        >
            <form onSubmit={handleLogin} className="space-y-5">
                <AuthField error={errors.fullname}>
                    <input
                        type="text"
                        placeholder="Ism familiya"
                        value={form.fullname}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                fullname: e.target.value,
                            })
                        }
                        className={authInputClass}
                    />
                </AuthField>

                <AuthField error={errors.email}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                        className={authInputClass}
                    />
                </AuthField>

                <button type="submit" className={authButtonClass}>
                    Kod yuborish
                </button>
            </form>
        </AuthShell>
    );
};

export default LoginPage;