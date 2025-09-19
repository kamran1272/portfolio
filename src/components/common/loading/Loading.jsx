import { HashLoader } from "react-spinners";

const Loading = ({ color = "#A53DFF", size = 80, speedMultiplier = 2 }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      role="status"
      aria-label="Loading..."
    >
      <HashLoader color={color} size={size} speedMultiplier={speedMultiplier} />
    </div>
  );
};

export default Loading;
