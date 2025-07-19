import { useForm } from 'react-hook-form';
import axios from 'axios';
import api from '../../utils/axiosConfig';

export function useHabitForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    try {
      const response = await api.post('/crear-habito', data); // ← sin Authorization, solo cookies
      reset();
      return {
        success: true,
        message: response.data.message,
        habit: response.data.habit
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al crear hábito'
      };
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors
  };
}

export default useHabitForm;
