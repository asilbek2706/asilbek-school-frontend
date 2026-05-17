import { redirect, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);

  throw redirect(`/auth/login${requestUrl.search}`);
}

export default function Route() {
  return null;
}
