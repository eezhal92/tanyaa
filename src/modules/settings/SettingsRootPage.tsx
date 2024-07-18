import { Outlet } from "react-router-dom";

export default function SettingsRootPage() {
  return (
    <div>
      <h1>Settings</h1>
      <Outlet />
    </div>
  )
}
