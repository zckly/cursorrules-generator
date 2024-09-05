"use client";

import { useModelSettings } from "../hooks/useModelSettings";
import RepoList from "./RepoList";

export default function ClientContent() {
  const modelSettings = useModelSettings();

  return <RepoList {...modelSettings} />;
}
