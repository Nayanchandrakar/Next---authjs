import { FC } from "react";
import NewPasswordForm from "@/app/(auth)/auth/new-password/_components/new-password-form";

interface NewPasswordPageProps {
  searchParams: {
    token: string;
  };
}

const NewPasswordPage: FC<NewPasswordPageProps> = ({ searchParams }) => {
  return (
    <div className="w-full h-full flex items-center flex-col justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      <NewPasswordForm token={searchParams?.token!} />
    </div>
  );
};

export default NewPasswordPage;
