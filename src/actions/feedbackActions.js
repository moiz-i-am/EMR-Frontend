import axios from "axios";

export const getDoctorFeedbacks = async (doctorId, token) => {
  try {
    console.log("doctor id is===> ", doctorId);
    const getFeedbacks = await axios.post(`/v1/feedback/doctor`, { doctorId });
    return getFeedbacks.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const saveDoctorsFeedback = async (feedbackData, token) => {
  try {
    console.log("doctor id is===> ", feedbackData);
    const getFeedbacks = await axios.post(`/v1/feedback`, feedbackData);

    return getFeedbacks;
  } catch (error) {
    console.log(error.message);
  }
};
