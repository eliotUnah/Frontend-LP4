import { useForm } from "react-hook-form";
import api from "../../utils/axiosConfig";

export function useHabitForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    // Transforma startTime si viene desde inputs tipo date/time
    const habitData = {
      title: data.title,
      category: data.category || "Otros",
      frequency: data.frequency,
      startTime: new Date(data.startTime).toISOString(), // ← asegura formato válido
      durationMinutes: parseInt(data.durationMinutes),
      daysOfWeek: data.daysOfWeek // ← array tipo ["MO", "WE", "FR"]
    };

    try {
      const response = await api.post("/crear-habito", habitData);
      reset();
      return {
        success: true,
        message: response.data.message,
        habit: response.data.habit
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error al crear hábito"
      };
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
     watch,
    errors
  };
}
export default useHabitForm;
