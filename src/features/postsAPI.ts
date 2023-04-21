import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export const posts = createApi({
  reducerPath: 'postsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      async queryFn() {
        try {
          const ref = collection(db, 'posts');
          const querySnapshot = query(ref, limit(30));
          const docs = await getDocs(querySnapshot);
          const posts = docs.docs.map((doc) => doc.data()) as IPost[];
          return { data: posts };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['posts'],
    }),
  }),
});

export const { useFetchPostsQuery } = posts;
