'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "./ui/form";
import { useChat } from '@ai-sdk/react';
import { Lightbulb, Dumbbell, Utensils, Timer } from "lucide-react";

function FirstSurveyCard() {
    const [step, setStep] = useState(1);
    const [isSubmited, setIsSubmitted] = useState(false)

    const { messages: msg1, handleSubmit: smartSubmit } = useChat({
        api: '/api/plan/smart'
    });
    const { messages: msg2, handleSubmit: mealSubmit } = useChat({
        api: '/api/plan/meal'
    });
    const { messages: msg3, handleSubmit: workoutSubmit } = useChat({
        api: '/api/plan/workout'
    });
    const { messages: msg4, handleSubmit: estimateSubmit } = useChat({
        api: '/api/plan/estimate'
    });


    const form = useForm({
        defaultValues: {
            age: "",
            gender: "",
            height: "",
            weight: "",
            purpose: "",
            purposeWeight: "",
            dietMethod: "",
            actionPlan: ""
        }
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        setIsSubmitted(true);
        smartSubmit(new Event('submit'), {
            data: data,
            allowEmptySubmit: true
        })
        mealSubmit(new Event('submit'), {
            data: data,
            allowEmptySubmit: true
        })
        workoutSubmit(new Event('submit'), {
            data: data,
            allowEmptySubmit: true
        })
        estimateSubmit(new Event('submit'), {
            data: data,
            allowEmptySubmit: true
        })

    };

    if (isSubmited) {
        return (
            // <Card className="w-full max-w-md mx-auto">
            //     <CardContent className="p-6 min-h-96 grid">
            //         <div className="flex justify-between flex-col w-full h-full">
            //             <h3 className="text-lg font-semibold">💡 AI 다이어트 플랜</h3>
            //             {messages.map(message => (
            //                 <div key={message.id}>
            //                     {/* <div>{message.role}</div> */}
            //                     <div>{message.content}</div>
            //                 </div>
            //             ))}
            //         </div>
            //     </CardContent>
            // </Card>
            // <Card className="w-full max-w-md mx-auto">
            //     <CardContent className="p-6 min-h-96 grid">
            //         <h3 className="text-lg font-semibold">💡 AI 다이어트 플랜</h3>
            //         <div>
            //             <h4 className="font-bold">📌 스마트 플랜</h4>
            //             <div>{
            //                 msg1.map(message => (
            //                     <div key={message.id}>
            //                         <div>{message.content}</div>
            //                     </div>
            //                 ))}</div>
            //         </div>
            //         <div>
            //             <h4 className="font-bold">🍽️ 식단 추천</h4>
            //             <div>{
            //                 msg2.map(message => (
            //                     <div key={message.id}>
            //                         <div>{message.content}</div>
            //                     </div>
            //                 ))}</div>
            //         </div>
            //         <div>
            //             <h4 className="font-bold">🏋️‍♂️ 운동 플랜</h4>
            //             <div>{
            //                 msg3.map(message => (
            //                     <div key={message.id}>
            //                         <div>{message.content}</div>
            //                     </div>
            //                 ))}</div>
            //         </div>
            //         <div>
            //             <h4 className="font-bold">⏳ 목표 달성 예상 기간</h4>
            //             <div>{
            //                 msg4.map(message => (
            //                     <div key={message.id}>
            //                         <div>{message.content}</div>
            //                     </div>
            //                 ))}</div>
            //         </div>
            //     </CardContent>
            // </Card>
            <Card className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-lg border border-gray-200 bg-white">
                <CardContent className="grid gap-6">
                    {/* AI 다이어트 플랜 제목 */}
                    <div className="flex items-center space-x-2">
                        <Lightbulb className="text-yellow-500" size={24} />
                        <h3 className="text-xl font-bold">AI 다이어트 플랜</h3>
                    </div>

                    {/* 스마트 플랜 */}
                    <div>
                        <div className="flex items-center space-x-2 text-red-500">
                            <span className="text-lg">📌</span>
                            <h4 className="text-lg font-semibold">스마트 플랜</h4>
                        </div>
                        <div className="text-gray-700 mt-2 space-y-2">
                            {msg1.map((message) => (
                                <p key={message.id}>{message.content}</p>
                            ))}
                        </div>
                    </div>

                    {/* 식단 추천 */}
                    <div>
                        <div className="flex items-center space-x-2 text-green-500">
                            <Utensils size={20} />
                            <h4 className="text-lg font-semibold">식단 추천</h4>
                        </div>
                        <div className="text-gray-700 mt-2 space-y-2">
                            {msg2.map((message) => (
                                <p key={message.id}>{message.content}</p>
                            ))}
                        </div>
                    </div>

                    {/* 운동 플랜 */}
                    <div>
                        <div className="flex items-center space-x-2 text-blue-500">
                            <Dumbbell size={20} />
                            <h4 className="text-lg font-semibold">운동 플랜</h4>
                        </div>
                        <div className="text-gray-700 mt-2 space-y-2">
                            {msg3.map((message) => (
                                <p key={message.id}>{message.content}</p>
                            ))}
                        </div>
                    </div>

                    {/* 목표 달성 예상 기간 */}
                    <div>
                        <div className="flex items-center space-x-2 text-purple-500">
                            <Timer size={20} />
                            <h4 className="text-lg font-semibold">목표 달성 예상 기간</h4>
                        </div>
                        <div className="text-gray-700 mt-2 space-y-2">
                            {msg4.map((message) => (
                                <p key={message.id}>{message.content}</p>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6 min-h-96 grid">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {step === 1 && (
                            <div className="w-full h-full">
                                <CardTitle className="text-xl font-semibold mb-4">기본 건강 정보</CardTitle>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>나이</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="나이" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>성별</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        className="w-full flex flex-col space-y-2">
                                                        <div className="flex items-center space-s-2">
                                                            <RadioGroupItem value="male" />
                                                            <FormLabel>남성</FormLabel>
                                                        </div>
                                                        <div className="flex items-center space-s-2">
                                                            <RadioGroupItem value="female" />
                                                            <FormLabel>여성</FormLabel>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="height"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>키 (cm)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="키(cm)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="weight"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>몸무게 (kg)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="몸무게(kg)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="button" onClick={nextStep} className="mt-4 w-full">다음</Button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="w-full h-full flex flex-col justify-between">
                                <div>
                                    <CardTitle className="text-xl font-semibold mb-4">1단계: 다이어트 목적 설정</CardTitle>
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name='purpose'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>목적</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="예: 건강회복, 바디 프로필 촬영" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='purposeWeight'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>목표 몸무게</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="예: 권고 감량 기준은 30일에 본인 몸무게의 5%" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4 gap-4">
                                    <Button onClick={prevStep} className="flex-1">이전</Button>
                                    <Button onClick={nextStep} className="flex-1">다음</Button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="w-full h-full flex flex-col justify-between">
                                <div>
                                    <CardTitle className="text-xl font-semibold mb-4">다이어트 방식 선택</CardTitle>
                                    <FormField
                                        control={form.control}
                                        name="dietMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>다이어트 방법</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        value={field.value}
                                                        onValueChange={field.onChange} // React Hook Form과 연동
                                                        className="w-full flex flex-col space-y-2"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="detox" id="detox" />
                                                            <FormLabel htmlFor="detox">디톡스 다이어트</FormLabel>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="fasting" id="fasting" />
                                                            <FormLabel htmlFor="fasting">간헐적 단식</FormLabel>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between mt-4 gap-4">
                                    <Button onClick={prevStep} className="flex-1">이전</Button>
                                    <Button onClick={nextStep} className="flex-1">다음</Button>
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="flex justify-between flex-col w-full h-full">
                                <div>
                                    <CardTitle className="text-xl font-semibold mb-4">구체적인 행동 계획</CardTitle>
                                    <FormField
                                        control={form.control}
                                        name="actionPlan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>액션플랜</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="예: 하루 500kcal 줄이고 매일 유산소 운동" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between mt-4 gap-4">
                                    <Button onClick={prevStep} className="flex-1">이전</Button>
                                    <Button onClick={nextStep} className="flex-1">다음</Button>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="flex justify-between flex-col w-full h-full">
                                <div>
                                    <CardTitle className="text-xl font-semibold mb-4">최종 결과</CardTitle>
                                    <p><strong>나이:</strong> {form.watch("age")}세</p>
                                    <p><strong>성별:</strong> {form.watch("gender") === "male" ? "남성" : "여성"}</p>
                                    <p><strong>키:</strong> {form.watch("height")}cm</p>
                                    <p><strong>몸무게:</strong> {form.watch("weight")}kg</p>
                                    <p><strong>{form.watch("purpose")}</strong></p>
                                    <p><strong>{form.watch("purposeWeight")}</strong></p>
                                    <p><strong>{form.watch("dietMethod")}</strong></p>
                                    <p><strong>{form.watch("actionPlan")}</strong></p>
                                </div>
                                <div className="flex justify-between mt-4 ">
                                    <Button type='submit' className="flex-1">
                                        다이어트 플랜 생성
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </Form>
                {/* Streaming UI */}
                {/* 스트리밍된 React 컴포넌트 렌더링 */}


            </CardContent>
        </Card >
    );
}

export default FirstSurveyCard;
