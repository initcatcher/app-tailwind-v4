import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const notifications = [
    {
        title: "테스트용 설문지입니다.",
        description: "1 hour ago",
    },
    {
        title: "테스트용 다이어트 설문지입니다.",
        description: "2 hour ago",
    },
    {
        title: "테스트용 설문지입니다.",
        description: "3 hour ago",
    },
]




type CardProps = React.ComponentProps<typeof Card> & {
    title: string;
    description: string
    href: string
};

export default function SurveyCard({ className, ...props }: CardProps) {
    const { title, description, href } = props;
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" asChild>
                    <Link href={href}>
                        설문하러가기
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
