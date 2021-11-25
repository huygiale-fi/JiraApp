import Main from "containers/client/Main/Main";

export const jiraRoutes = [
    {
        path:"/project/:id",
        component:Main,
        exact:true,
        isPrivate:true,
    }
]