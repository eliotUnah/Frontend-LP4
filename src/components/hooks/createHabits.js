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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJmQ0d2TUFicHEwYUdpaGVPakFjWjlJSjFoSjQzIiwiZW1haWwiOiJlbGlvdHVuYWhAZ21haWwuY29tIiwiaWF0IjoxNzUxOTEwNTM2LCJleHAiOjE3NTI1MTUzMzZ9.HG8dTe3t3AlTFyCMIGwkVpu0ZLbVcmsoSvAox0pAYXI';

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
