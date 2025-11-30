import axios from "axios";

// =========================
// הגדרת Base URL ו-Interceptor
// =========================
// שינוי נדרש: במקום הכתובת הקבועה, משתמשים במשתנה הסביבה.
// שימו לב: משתנה הסביבה REACT_APP_API_URL מכיל כבר את '/api' בסופו.
// לכן, נשתמש רק ב-process.env.REACT_APP_API_URL.
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios Error:", error);
    return Promise.reject(error);
  }
);

// =========================
// פונקציות API
// =========================
export default {
  // שליפת כל המשימות
  getTasks: async () => {
    // הפנייה תהיה לכתובת הבסיס (REACT_APP_API_URL) + '/tasks'
    const result = await axios.get("/tasks");
    return result.data;
  },

  // הוספת משימה חדשה
  addTask: async (name) => {
    const result = await axios.post("/tasks", { name, isComplete: false });
    return result.data;
  },

  // עדכון סטטוס משימה (סימון כהושלם/לא הושלם)
  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`/tasks/${id}`, { isComplete });
    return result.data;
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    const result = await axios.delete(`/tasks/${id}`);
    return result.data;
  }
};