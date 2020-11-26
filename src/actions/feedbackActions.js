import axios from "axios";

export const getDoctorFeedbacks = async (doctorId, token) => {
  try {
    const getFeedbacks = await axios.post(`/v1/feedback/doctor`, doctorId);
    return getFeedbacks.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
