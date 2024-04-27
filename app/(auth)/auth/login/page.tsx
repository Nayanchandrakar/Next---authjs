import LoginForm from "@/app/(auth)/auth/login/_components/login-form";

const LoginPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
