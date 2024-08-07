import { useMutation, useQuery } from '@tanstack/react-query';
import { createBookmark, deleteBookmark, getAllBookmark } from 'api/bookmark.api';

export const useCreateBookmark = () => {
  const CreateBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      console.log('Bookmark Created');
    },
  });

  const status = CreateBookmarkMutation.status;

  return { CreateBookmarkMutation, status };
};

export const useGetBookmarks = (userId: string) => {
  const getBookmarksQuery = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => getAllBookmark(userId),
  });

  const bookmarks = getBookmarksQuery.data;
  const status = getBookmarksQuery.status;

  return { bookmarks, status };
};

export const useDeleteBookmark = () => {
  const DeleteBookmarkMutation = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      console.log('Bookmark Deleted');
    },
  });

  const status = DeleteBookmarkMutation.status;

  return { DeleteBookmarkMutation, status };
};
