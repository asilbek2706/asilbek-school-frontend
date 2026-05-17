import { redirect, type LoaderFunctionArgs } from "react-router";
import { githubService } from "@/features/github-auth/services/github.service";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const destination = githubService.getStartUrl(requestUrl.origin);
  throw redirect(destination);
}

export default function GitHubAuthStart() {
  return null;
}
