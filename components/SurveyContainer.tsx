import { CardTitle } from "./ui/card";

function SurveyContainer({
    title,
    children,
    footer,
}: { title: string, children: React.ReactNode, footer: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="flex-1">
                <CardTitle className="text-xl font-semibold mb-4">{title}</CardTitle>
                <div className="gap-4 flex flex-col justify-center">
                    {children}
                </div>
            </div>
            <div className="flex justify-between mt-4 gap-4">
                {footer}
            </div>
        </div>
    )
}

export default SurveyContainer;