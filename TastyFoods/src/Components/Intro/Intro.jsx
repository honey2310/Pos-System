// import React, { useEffect, useState } from "react";
// import { replace, useNavigate } from "react-router-dom";
// import "./Intro.css";

// export default function Intro() {
//   const [showSplash, setShowSplash] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//       navigate("/login",{replace:false}); // 👈 automatically go to login after splash
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <img
//         src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900"
//         alt="Restaurant Background"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/60" />

//       {/* Restaurant Name */}
//       <h1 className="z-10 text-5xl md:text-7xl font-extrabold text-white tracking-widest animate-fadeInOut">
//         Tasty<span className="text-red-500">FOODS</span>
//       </h1>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

export default function Intro() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate("/login", { replace: false }); // automatically go to login after splash
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900"
        alt="Restaurant Background"
        className="absolute inset-0 w-full h-full object-cover brightness-90"
      />
<div className="absolute inset-0 bg-gradient-to-br from-[#f7f0fd]/30 via-[#dfc9b8]/20 to-[#ae8c72]/10" />


      {/* Restaurant Name */}
      <h1 className="z-10 text-5xl md:text-7xl font-extrabold text-[#04040b] tracking-widest animate-fadeInOut">
        Tasty<span className="text-[#ae8c72]">FOODS</span>
      </h1>
    </div>
  );
}
