export type KeyValue = Record<string, unknown>;

export type RunnerResult = {
  ok: boolean;
  status?: number;
  data?: unknown;
  error?: string;
};

export type ModuleAction = {
  id: string;
  label: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  requestTemplate?: KeyValue;
  notes?: string;
};

export type ModuleConfig = {
  id: string;
  title: string;
  description?: string;
  actions: ModuleAction[];
};
