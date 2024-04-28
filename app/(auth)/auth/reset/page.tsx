import ResetForm from "@/app/(auth)/auth/reset/_components/reset-form";

interface ResetPageProps {}

const ResetPage = ({}: ResetPageProps) => {
  return (
    <div className="w-full h-full flex items-center flex-col justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      <ResetForm />
    </div>
  );
};

export default ResetPage;
