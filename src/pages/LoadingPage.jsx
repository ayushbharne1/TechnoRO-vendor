import React, { useState, useEffect } from "react";
import Logo from "../../public/Logo.svg";

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 20;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, 500);

        return () => clearInterval(interval); // Cleanup to prevent memory leaks
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#dcf3f0]">
            <div className="flex justify-end items-center ">
                <img src={Logo} alt="Logo" className="w-[100px]" />
                <h1 className="text-3xl font-bold text-gray-800">Techno RO</h1>
            </div>
            <div className="w-[464px] h-4 bg-gray-300 rounded-full overflow-hidden mt-4">
                <div
                    className="h-full bg-[#74c9c4] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingPage;
