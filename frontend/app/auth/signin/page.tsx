'use client'

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const router = useRouter();
    const { data: session } = useSession();

    if (session) {
        router.push('/');
    }

    const handleLineSignin = async () => {
        await signIn('line');
    }

    return(
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
                    
                    {/* Logo section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-6 transform hover:scale-105 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-20"></div>
                            <Image 
                                src="/logo.jpg" 
                                alt="Flybrary Logo" 
                                width={160} 
                                height={210}
                                className="relative rounded-2xl shadow-lg"
                            />
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 text-center">
                            Sign in to continue to Flybrary
                        </p>
                    </div>

                    {/* LINE Login Button */}
                    <button
                        onClick={() => handleLineSignin()}
                        className="w-full flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold rounded-xl px-6 py-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/*Line Icon PATH MANN SOO LONGGG*/}
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                        </svg>
                        <span>Sign in with LINE</span>
                    </button>

                    {/* Additional info WHERE IS MY ENDFIELD */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            By continuing, you agree to our{' '}
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-blue-600 hover:text-blue-700 font-medium">
                                Terms of Service
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer text DAMN I NEED THAT BETA*/}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Need help?{' '}
                    <a href="https://www.instagram.com/daykungza" className="text-blue-600 hover:text-blue-700 font-medium">
                        Contact Support
                    </a>
                </p>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}