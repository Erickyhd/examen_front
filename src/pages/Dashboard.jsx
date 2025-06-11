import React from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="backdrop-blur-2xl bg-white/20 z-20 fixed rounded-b-lg w-full text-white font-serif md:text-2xl font-bold">
      <nav className="flex justify-between p-2">
        <Link to={"/"}>AncoSur</Link>
        <span className="flex gap-4">
          <Link to={"/proyectos"}>proyectos</Link>
        </span>
      </nav>
    </div>
  );
}

export default Dashboard;
