import { useForm } from 'react-hook-form';
import axios from 'axios';

export function useHabitForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJQU3RJYVlON3liVTdwcG5LeFBFajZsRFYxc0MzIiwiZW1haWwiOiJlbGlvdHVuYWgyNEBnbWFpbC5jb20iLCJpYXQiOjE3NTI1MjA0OTIsImV4cCI6MTc1MzEyNTI5Mn0.T8IbPpymuybIinX2OZTDcYF39AD0sgCQX-jaP6ScJ3g';

    try {
      const response = await axios.post('http://localhost:5000/crear-habito', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
