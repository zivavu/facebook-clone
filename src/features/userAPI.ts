import { db } from '@/config/firebase.config';
import { User } from '@/types/user';
import { UserServerData } from '@/types/userServerData';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export const user = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      async queryFn() {
        try {
          const ref = collection(db, 'users');
          const querySnapshot = query(ref, limit(10));
          const data = await getDocs(querySnapshot);
          const user = data.docs.map((doc) => doc.data()) as UserServerData[];
          const maxFriendsAcc = user.sort((a, b) => {
            if (a.friends.length > b.friends.length) return -1;
            if (a.friends.length < b.friends.length) return 1;
            return 0;
          })[0];

          return maxFriendsAcc ? { data: { ...maxFriendsAcc } } : { error: 'No user' };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useFetchUserQuery } = user;
