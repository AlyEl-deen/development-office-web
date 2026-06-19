import { useEffect, useState } from "react";
import { subscribeProject, subscribeProjects } from "../lib/projects";
import { Project } from "../lib/utils";

type ProjectsState = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

type ProjectState = {
  project: Project | null;
  loading: boolean;
  error: string | null;
};

export function useProjects(): ProjectsState {
  const [state, setState] = useState<ProjectsState>({
    projects: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    return subscribeProjects(
      (projects) => setState({ projects, loading: false, error: null }),
      () => setState((current) => ({ ...current, loading: false, error: "Projects could not be loaded." })),
    );
  }, []);

  return state;
}

export function useProject(projectId?: string): ProjectState {
  const [state, setState] = useState<ProjectState>({
    project: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!projectId) {
      setState({ project: null, loading: false, error: "Project id is missing." });
      return;
    }

    setState({ project: null, loading: true, error: null });

    return subscribeProject(
      projectId,
      (project) => setState({ project, loading: false, error: null }),
      () => setState({ project: null, loading: false, error: "Project could not be loaded." }),
    );
  }, [projectId]);

  return state;
}
