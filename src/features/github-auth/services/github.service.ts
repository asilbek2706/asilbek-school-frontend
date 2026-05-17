import { githubRepository } from "@/features/github-auth/repository/github.repository";

export const githubService = {
  getStartUrl: (origin: string) => githubRepository.getStartUrl(origin),
  callback: (searchParams: string) => githubRepository.callback(searchParams),
};
