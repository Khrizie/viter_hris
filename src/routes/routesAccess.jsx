import { devNavUrl } from "../functions/functions-general";
import CreatePassword from "../pages/access/CreatePassword";

export const routeAccess = [
    {
        path : `${devNavUrl}/create-password`,
        element : <CreatePassword />,
    },
];