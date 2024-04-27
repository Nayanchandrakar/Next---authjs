import { FC } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardWrapperProps {
  backButtonLabel?: string;
  backButtonHref?: string;
  children: React.ReactNode;
  Heading: string;
  description: string;
  cardClassName?: string;
}

const CardWrapper: FC<CardWrapperProps> = ({
  Heading,
  children,
  description,
  backButtonHref,
  backButtonLabel,
  cardClassName,
}) => {
  return (
    <Card className={cn("w-[500px] h-fit", cardClassName)}>
      <CardHeader className="text-center">
        <CardTitle>{Heading}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {backButtonHref && backButtonLabel && (
        <CardFooter className="flex items-center justify-center">
          <Link
            className="hover:underline transition-all duration-150"
            href={backButtonHref}
          >
            {backButtonLabel}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
