import { Button } from "@/components/ui/button";
import Link from "next/link";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="w-full h-full flex items-center flex-col justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="text-white flex items-center justify-center flex-col gap-4">
        <h1 className="font-semibold text-5xl">Auth screen</h1>
        <p>A simple authentication service provider.</p>

        <Button className="w-fit" asChild size="lg">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    </main>
  );
};

export default page;
