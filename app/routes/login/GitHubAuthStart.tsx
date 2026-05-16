import { redirect, type LoaderFunctionArgs } from "react-router";

const OAUTH_STATE_COOKIE = "github_oauth_state";

export async function loader({ request }: LoaderFunctionArgs) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    throw redirect("/auth/register?oauth_error=not_configured");
  }

  const requestUrl = new URL(request.url);
  const redirectUri =
    process.env.GITHUB_REDIRECT_URI ||
    `${requestUrl.origin}/auth/github/callback`;

  const state = crypto.randomUUID();
  const authorizationUrl = new URL("https://github.com/login/oauth/authorize");

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("scope", "read:user user:email");
  authorizationUrl.searchParams.set("state", state);

  throw redirect(authorizationUrl.toString(), {
    headers: {
      "Set-Cookie": `${OAUTH_STATE_COOKIE}=${state}; Path=/; Max-Age=600; HttpOnly; SameSite=Lax`,
    },
  });
}

export default function GitHubAuthStart() {
  return null;
}
