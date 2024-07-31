import { useMutation, useQuery } from '@tanstack/react-query';
import { User, createUser, deleteUser, getUser, updateUser } from 'api/user.api';

export const useCreateUser = () => {
  const CreateMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      console.log('User Created');
    },
  });

  const status = CreateMutation.status;

  return { CreateMutation, status };
};

export const useGetUser = (userId: string) => {
  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(userId),
    retry: 1,
  });

  const userData = getUserQuery.data;
  const status = getUserQuery.status;

  return { userData, status };
};

export const useUpdateUser = ({ userId, jobRole, skills, location }: User) => {
  const userData = {
    userId,
    jobRole,
    skills,
    location,
  };

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      console.log('User Updated');
    },
  });

  const updateUserMutation = updateMutation.mutate(userData, {
    onSuccess: () => {
      console.log('User Updated');
    },
    onError: () => {
      console.log('Error updating user');
    },
  });

  const status = updateMutation.status;

  return { updateUserMutation, status };
};

export const useDeleteUser = (userId: string) => {
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      console.log('User Deleted');
    },
  });

  const status = deleteMutation.status;

  return { deleteMutation, status };
};
