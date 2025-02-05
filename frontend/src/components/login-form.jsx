import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletComponents } from "./WalletComponents"

export function LoginForm({
  className,
  ...props
}) {
  return (
    (<div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 h-[500px]">
            <div className="flex flex-col gap-8 mx-auto p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your ATHL3TE account
                </p>
              </div>
              <WalletComponents/>
            </div>
          <div className="relative bg-muted md:block">
            <img
              src="/cover.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}
