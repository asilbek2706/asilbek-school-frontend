import { PublicRoute } from "@/app/router/route-guards";
import RegisterPage from "@/features/auth/pages/RegisterPage";

export default function Route() {
	return (
		<PublicRoute>
			<RegisterPage />
		</PublicRoute>
	);
}
