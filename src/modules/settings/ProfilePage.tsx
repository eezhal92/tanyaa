import { useCallback, useState } from "react"

type AppUser = {
  id: number,
  name: string,
  username: string,
}

const baseURL = import.meta.env.VITE_BASE_URL;

const userService = {
  getUser(id: number): Promise<AppUser> {
    return fetch(`${baseURL}/users/${id}`)
    .then(res => res.json())
  }
} as const

export default function ProfilePage() {
  const [isFetching, setFetching] = useState<boolean>(false);
  const [user, setUser] = useState<AppUser | null>(null)

  const fetchUser = useCallback(() => {
    setFetching(true);
    return userService.getUser(1)
      .then((data: AppUser) => {
        setUser(data)
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return (
    <div>
      <button onClick={fetchUser}>Fetch user</button>
      {isFetching && <p>Fetching user...</p>}
      {user ? <p>{user.name}</p> : <p>no user</p>}
    </div>
  )
}
