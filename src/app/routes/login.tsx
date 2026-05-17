import { PublicRoute } from "@/app/router/route-guards";
import LoginPage from "@/features/auth/pages/LoginPage";

export default function Route() {
	return (
		<PublicRoute>
			<LoginPage />
		</PublicRoute>
	);
}
