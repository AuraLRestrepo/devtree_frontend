import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ErrorMessage } from '../components/ErrorMessage';
import { updateUser } from '../api/DevTreeAPI';
import { toast } from 'sonner';
import type { User, UserProfile } from '../types';

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(['user'])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: { handle: data.handle, description: data.description },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (updatedUser) => {
      toast.success(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleUserProfileForm = (formData: UserProfile) => {
    updateUserMutation.mutate(formData);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register('handle', {
            required: 'El Handle es obligatorio',
            minLength: {
              value: 3,
              message: 'El Handle debe tener al menos 3 caracteres',
            },
          })}
        />

        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
