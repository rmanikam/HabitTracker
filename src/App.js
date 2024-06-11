import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeekView from "./components/WeekView/WeekView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import HabitForm from "./components/Form/HabitForm";
import Home from "./components/Home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/add-habit",
        element: <HabitForm />,
      },
      {
        path: "/week-view",
        element: <WeekView />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
