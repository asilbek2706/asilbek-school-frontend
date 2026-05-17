import { PublicRoute } from "@/app/router/route-guards";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";

export default function Route() {
	return (
		<PublicRoute>
			<VerifyOtpPage />
		</PublicRoute>
	);
}
