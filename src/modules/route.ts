import { api } from "./../index";

export const routerMethods = [
  "all",
  "head",
  "get",
  "patch",
  "post",
  "put",
  "delete",
] as const;
export type RouteMethod = typeof routerMethods[number];

export type RouteType = {
  path: string;
  action: string;
  dir?: string;
  matchTrailingPathParts?: boolean;
  apiVersion?: number | string;
};

export type RoutesConfig = Partial<
  Record<typeof routerMethods[number], RouteType[]>
>;

export namespace route {
  /**
   * Programmatically define a route, rather than using `config.routes`.  This is useful for plugins which may define routes as well.
   * You can use both `routes.registerRoute` and `config.routes` in the same project.
   *
   * * method:                 HTTP verb (get, put, etc)
   * * path:                   The route in question.  Can use variables.
   * * action:                 The action to call with this route.
   * * apiVersion:             The version of the action to call, if more than one.
   * * matchTrailingPathParts: Allows the final segment of your route to absorb all trailing path parts in a matched variable. (ie: /api/user would match /api/user/123)
   * * dir:                    Which folder to serve static files from (must by included in config.general.paths)
   */
  export function registerRoute(
    method: string,
    path: string,
    action: string,
    apiVersion?: number | string,
    matchTrailingPathParts: boolean = false,
    dir?: string
  ) {
    const verbs =
      method === "all" ? routerMethods : ([method] as [RouteMethod]);
    for (const vi in verbs) {
      const verb = verbs[vi];
      api.routes.routes[verb].push({
        path: path,
        matchTrailingPathParts: matchTrailingPathParts,
        action: action,
        dir: dir,
        apiVersion: apiVersion,
      });
    }
  }
}
