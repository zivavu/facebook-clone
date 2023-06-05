import { useFetchLoggedUserQuery } from '@/redux/services/loggedUserAPI';

export default function useGetFriendRequests() {
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const friendRequests = Object.entries(loggedUser?.friends || {}).filter(
    ([, friend]) => friend.status === 'req_received',
  );
  return friendRequests;
}
