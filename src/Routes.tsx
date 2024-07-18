import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import QnAPage from "./qna/QnAPage";

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
        path: '*',
        element: <div>👀</div>
      }
    ]
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
