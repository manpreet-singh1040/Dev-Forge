import React from "react";

const Loading = () => {
        return (
          <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center">
              {/* Spinner Animation */}
              <div className="loader border-t-green-400 border-4 border-solid rounded-full w-16 h-16 mb-4 animate-spin"></div>
      
              {/* Loading Text */}
              <h1 className="text-green-400 text-xl font-semibold animate-bounce">Loading...</h1>
            </div>
      
            {/* Custom CSS for Loader */}
            <style jsx>{`
              .loader {
                border-top-color: #10b981; /* Green-400 */
                border-right-color: transparent;
                border-bottom-color: #10b981; /* Green-400 */
                border-left-color: transparent;
              }
            `}</style>
          </div>
        );
      
    }
export default Loading;