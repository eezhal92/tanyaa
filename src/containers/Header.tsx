import { useAppSelector } from "../store";
import { authSelectors } from "../store/auth.slice";

export default function Header() {
  const user = useAppSelector(authSelectors.selectUser);
  return (
    <div className="bg-orange-400 text-white">
      <div className="s-container">
        <div className="flex justify-between py-3 border-b border-orange-200">
          <div><a href="/#">&larr;</a></div>
          <div>
            <button>{user ? user.name : 'You\'re Anonymous'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
