import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import QnAPage from "./modules/qna/QnAPage";
import SettingsRootPage from "./modules/settings/SettingsRootPage";
import ProfilePage from "./modules/settings/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div id="root-router">
        <Outlet />
      </div>
    ),
    children: [
      {
        path: ':tenant/q/:qid',
        element: <QnAPage />
      },
      {
        path: 'settings',
        element: <SettingsRootPage />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />
          }
        ]
      },
      {
        path: '*',
        element: <div>👀</div>
      }
    ]
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
