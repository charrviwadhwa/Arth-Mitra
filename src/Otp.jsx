// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";

// import OtpInput from "otp-input-react";
// import { useState, useEffect } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { auth } from "./firebase/config.js";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import Home from "./Home.jsx";

// const AuthComponent = () => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);

//   // ✅ Initialize reCAPTCHA on component mount
//   useEffect(() => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             console.log("Recaptcha verified");
//           },
//           "expired-callback": () => {
//             toast.error("ReCAPTCHA expired, please try again.");
//           },
//         }
//       );
//     }
//   }, []);

//   async function onSignup() {
//     setLoading(true);
//     try {
//       // Ensure reCAPTCHA is available
//       if (!window.recaptchaVerifier) {
//         toast.error("Recaptcha not ready, please refresh.");
//         setLoading(false);
//         return;
//       }

//       const appVerifier = window.recaptchaVerifier;
//       const formattedPhone = `+${ph}`; // Ensure correct format

//       const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
//       window.confirmationResult = confirmationResult;

//       setShowOTP(true);
//       toast.success("OTP sent successfully!");
//     } catch (error) {
//       console.error("Signup Error:", error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function onOTPVerify() {
//     setLoading(true);
//     try {
//       if (!window.confirmationResult) {
//         toast.error("OTP verification error, please request a new code.");
//         return;
//       }

//       const result = await window.confirmationResult.confirm(otp);
//       setUser(result.user);
//       toast.success("Login successful!");
//     } catch (error) {
//       console.error("OTP Verification Error:", error);
//       toast.error("Invalid OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section className="">
      
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>
//         {user ? (
//           <Home/>
//         ) : (
//           <section className="bg-blue-500 flex items-center justify-center h-screen">
//             <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//             <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
//               Welcome to <br /> UdyamSaathi
//             </h1>
//             {showOTP ? (
//               <>
//                 <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
//                   <BsFillShieldLockFill size={30} />
//                 </div>
//                 <label htmlFor="otp" className="font-bold text-xl text-white text-center">
//                   Enter your OTP
//                 </label>
//                 <OtpInput
//                   value={otp}
//                   onChange={setOtp}
//                   OTPLength={6}
//                   otpType="number"
//                   disabled={false}
//                   autoFocus
//                   className="opt-container"
//                 />
//                 <button
//                   onClick={onOTPVerify}
//                   className="bg-blue-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                   disabled={loading}
//                 >
//                   {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//                   <span>Verify OTP</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
//                   <BsTelephoneFill size={30} />
//                 </div>
//                 <label htmlFor="" className="font-bold text-xl text-white text-center">
//                   Verify your phone number
//                 </label>
//                 <PhoneInput country={"in"} value={ph} onChange={setPh} />
//                 <button
//                   onClick={onSignup}
//                   className="bg-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                   disabled={loading}
//                 >
//                   {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
//                   <span>Send code via SMS</span>
//                 </button>
//               </>
//             )}
//           </div>
//           </section>
//         )}
//       </div>
      
//     </section>
//   );
  
// };

// export default AuthComponent;

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase/config.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Home from "./Home.jsx";

const AuthComponent = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Initialize reCAPTCHA on component mount
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
          "expired-callback": () => {
            toast.error("ReCAPTCHA expired, please try again.");
          },
        }
      );
    }
  }, []);

  async function onSignup() {
    setLoading(true);
    try {
      // Ensure reCAPTCHA is available
      if (!window.recaptchaVerifier) {
        toast.error("Recaptcha not ready, please refresh.");
        setLoading(false);
        return;
      }

      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+${ph}`; // Ensure correct format

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmationResult;

      setShowOTP(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onOTPVerify() {
    setLoading(true);
    try {
      if (!window.confirmationResult) {
        toast.error("OTP verification error, please request a new code.");
        return;
      }

      const result = await window.confirmationResult.confirm(otp);
      setUser(result.user);
      toast.success("Login successful!");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>

        {!user && (
  <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black text-center py-2 font-bold z-50">
    For testing purposes, you can use the following:
    <br />
    Phone Number: +91 9999988888 | OTP: 123456 (Fictional OTP for testing purposes)
  </div>
)}

        {user ? (
          <Home />
        ) : (
          <section className="bg-blue-500 flex items-center justify-center h-screen">
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
              <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                Welcome to <br /> ArthMitra
              </h1>
              {showOTP ? (
                <>
                  <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <label htmlFor="otp" className="font-bold text-xl text-white text-center">
                    Enter your OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container"
                  />
                  <button
                    onClick={onOTPVerify}
                    className="bg-blue-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    disabled={loading}
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label htmlFor="" className="font-bold text-xl text-white text-center">
                    Verify your phone number
                  </label>
                  <PhoneInput country={"in"} value={ph} onChange={setPh} />
                  <button
                    onClick={onSignup}
                    className="bg-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    disabled={loading}
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Send code via SMS</span>
                  </button>
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default AuthComponent;
