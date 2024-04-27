import RegisterForm from "@/app/(auth)/auth/register/_components/register-form";

const RegisterPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
