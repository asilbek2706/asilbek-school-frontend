import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import AuthShell, {
  AuthField,
  authButtonClass,
  authInputClass,
} from "./AuthShell";

const buildEmailAvatar = (fullname?: string, email?: string) => {
  const seed = fullname?.trim() || email?.trim() || "Asilbek School";

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    seed
  )}`;
};

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = location.state as
    | {
        fullname?: string;
        email?: string;
      }
    | null;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!code.trim()) {
      setError("Tasdiqlash kodini kiriting");
      return false;
    }

    if (!/^\d{6}$/.test(code.trim())) {
      setError("Kod 6 ta raqamdan iborat bo‘lishi kerak");
      return false;
    }

    setError("");
    return true;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // backend verify

    if (code === "123456") {
      document.cookie = "asilbek_auth=1; path=/; max-age=604800";
      localStorage.setItem(
        "asilbek_profile",
        JSON.stringify({
          fullname: initialState?.fullname ?? "",
          email: initialState?.email ?? "",
          avatarUrl: buildEmailAvatar(initialState?.fullname, initialState?.email),
          authMethod: "email",
        })
      );
      toast.success("Kod tasdiqlandi");
      navigate("/");
    } else {
      setError("Kod noto‘g‘ri");
      toast.error("Kod xato");
    }
  };

  return (
    <AuthShell
      title="Kodni tasdiqlash"
      description="Emailga yuborilgan kodni kiriting"
    >
      <form onSubmit={handleVerify} className="space-y-5">
        <AuthField error={error}>
          <input
            type="text"
            placeholder="123456"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) {
                setError("");
              }
            }}
            className={`${authInputClass} text-center tracking-[0.5em] text-xl`}
          />
        </AuthField>

        <button type="submit" className={authButtonClass}>
          Tasdiqlash
        </button>
      </form>
    </AuthShell>
  );
};

export default VerifyCodePage;