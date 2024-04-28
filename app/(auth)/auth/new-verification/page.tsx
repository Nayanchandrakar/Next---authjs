import { verifyToken } from "@/app/action/verify-token";
import CardWrapper from "@/components/shared/card-wrapper";
import { cn } from "@/lib/utils";

interface VerificationPageProps {
  searchParams: { token: string };
}

const VerificationPage = async ({ searchParams }: VerificationPageProps) => {
  const { token } = searchParams;

  if (!token) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <span className="text-xl font-medium">please provide a token</span>
      </div>
    );
  }

  const data = await verifyToken(token);

  return (
    <div className="w-full h-full flex items-center flex-col justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      <CardWrapper
        Heading="Auth"
        description="verify your email"
        backButtonHref="/auth/login"
        backButtonLabel="back to login"
      >
        <div
          className={cn(
            "flex text-sm   justify-center items-center w-full h-32 border rounded-md transition-all duration-300",
            data?.error
              ? "text-red-500 bg-red-100 border-red-500"
              : "text-green-500 border-green-500 bg-green-100"
          )}
        >
          {data?.error}
          {data?.success}
        </div>
      </CardWrapper>
    </div>
  );
};

export default VerificationPage;
