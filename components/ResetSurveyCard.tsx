"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormField,
} from "@/components/ui/form";
import { Lightbulb } from "lucide-react";
import SurveyContainer from "./SurveyContainer";

// 심리 질문 10문항
const PSYCH_QUESTIONS = [
    {
        id: 1,
        label: "현재 자신의 체형에 대해 얼마나 만족하시나요?",
        choices: ["매우 만족", "만족", "보통", "불만족", "매우 불만족"],
    },
    {
        id: 2,
        label: "다이어트를 결심하게 된 가장 큰 이유는 무엇인가요?",
        choices: ["건강 문제", "외모 개선", "특정 목표", "주변 권유", "기타"],
    },
    {
        id: 3,
        label: "스트레스를 받을 때 주로 어떻게 해소하시나요?",
        choices: ["운동", "음식 섭취", "쇼핑", "수면", "기타"],
    },
    {
        id: 4,
        label: "다이어트를 시도한 경험이 있나요?",
        choices: ["없음", "1~5번", "6번 이상"],
    },
    {
        id: 5,
        label: "다이어트를 할 때 가장 어려운 점은 무엇인가요?",
        choices: ["식욕 조절", "운동 지속", "시간 부족", "주변 환경", "기타"],
    },
    {
        id: 6,
        label: "목표 체중을 달성하기 위해 계획을 세우는 편인가요?",
        choices: ["매우 그렇다", "그렇다", "보통이다", "그렇지 않다", "전혀 아니다"],
    },
    {
        id: 7,
        label: "다이어트 실패의 가장 큰 이유는 무엇인가요?",
        choices: ["의지 부족", "환경적 요인", "방법이 맞지 않음", "기타"],
    },
    {
        id: 8,
        label: "스스로 식사와 운동 습관을 잘 관리할 수 있나요?",
        choices: ["매우 그렇다", "그렇다", "보통이다", "그렇지 않다", "전혀 아니다"],
    },
    {
        id: 9,
        label: "다이어트 성공을 위해 가장 필요한 요소는 무엇인가요?",
        choices: ["의지", "전문가 도움", "운동", "식단 관리", "기타"],
    },
    {
        id: 10,
        label: "주변 사람들에게 다이어트 사실을 알리는 편인가요?",
        choices: ["항상 알린다", "가끔 알린다", "거의 알리지 않는다", "전혀 알리지 않는다"],
    },
];

// 식습관 질문 10문항
const DIET_QUESTIONS = [
    {
        id: 11,
        label: "하루에 몇 끼 식사를 하시나요?",
        choices: ["1끼", "2끼", "3끼", "4끼 이상"],
    },
    {
        id: 12,
        label: "주로 어떤 시간대에 식사를 하시나요?",
        choices: ["규칙적인 시간", "불규칙한 시간"],
    },
    {
        id: 13,
        label: "외식을 얼마나 자주 하시나요?",
        choices: ["주 1회 이하", "주 2~3회", "주 4회 이상"],
    },
    {
        id: 14,
        label: "식사 시 어떤 음식을 주로 선택하시나요?",
        choices: ["가공식품", "자연식품", "패스트푸드", "직접 요리한 음식"],
    },
    {
        id: 15,
        label: "음식을 선택할 때 가장 중요한 요소는 무엇인가요?",
        choices: ["맛", "칼로리", "영양 성분", "가격", "편의성"],
    },
    {
        id: 16,
        label: "배가 고프지 않아도 음식을 먹는 경우가 있나요?",
        choices: ["자주 있다", "가끔 있다", "거의 없다", "전혀 없다"],
    },
    {
        id: 17,
        label: "야식을 먹는 빈도는 어느 정도인가요?",
        choices: ["매일", "주 3~2회", "거의 안 먹음"],
    },
    {
        id: 18,
        label: "음식을 먹을 때 포만감을 느낀 후에도 계속 먹는 편인가요?",
        choices: ["항상 그렇다", "종종 그렇다", "가끔 그렇다", "전혀 아니다"],
    },
    {
        id: 19,
        label: "단 음식을 얼마나 자주 섭취하시나요?",
        choices: ["매일", "주 3~2회", "거의 안 먹음"],
    },
    {
        id: 20,
        label: "평소 수분 섭취(물, 차 등)는 얼마나 하시나요?",
        choices: ["하루 500ml 이하", "500ml~2L", "2L 이상"],
    },
];

// 활동 질문 10문항
const ACTIVITY_QUESTIONS = [
    {
        id: 21,
        label: "하루 중 앉아서 보내는 시간이 얼마나 되나요?",
        choices: ["4시간 이하", "4~8시간", "8시간 이상"],
    },
    {
        id: 22,
        label: "주로 어떤 교통수단을 이용하시나요?",
        choices: ["도보", "자전거", "대중교통", "자차 이용"],
    },
    {
        id: 23,
        label: "주당 운동 횟수는 어떻게 되나요?",
        choices: ["운동 안 함", "주 1~4회", "주 5회 이상"],
    },
    {
        id: 24,
        label: "운동을 할 때 선호하는 방식은 무엇인가요?",
        choices: ["유산소 운동", "근력 운동", "요가, 필라테스", "스포츠 활동", "기타"],
    },
    {
        id: 25,
        label: "평소에 계단을 이용하는 편인가요?",
        choices: ["항상 이용", "가끔 이용", "거의 이용 안 함"],
    },
    {
        id: 26,
        label: "하루 평균 몇 걸음 정도 걷나요?",
        choices: ["5천 보 이하", "5천~1만 보", "1만 보 이상"],
    },
    {
        id: 27,
        label: "주말이나 휴일에 주로 어떤 활동을 하시나요?",
        choices: ["집에서 휴식", "가벼운 산책", "적극적인 운동", "기타"],
    },
    {
        id: 28,
        label: "운동할 때 컨텐츠(음악, 유튜브 등)를 보시나요?",
        choices: ["항상 그렇다", "종종 그렇다", "가끔 그렇다", "전혀 아니다"],
    },
    {
        id: 29,
        label: "운동을 할 때 목표 설정을 하는 편인가요?",
        choices: ["항상 목표를 세운다", "가끔 목표를 세운다", "목표를 세우지 않는다"],
    },
    {
        id: 30,
        label: "성공적인 다이어트를 위해 어떤 요소가 더 중요한가요?",
        choices: ["운동", "식단", "둘 다 중요함"],
    },
];


// 예시: 유형별 상세 설명 (심리, 식습관, 활동)

// 심리 유형 (Psychological Types)
const PSYCH_DETAILS: Record<string, string> = {
    "목표 지향형": `계획과 목표 설정에 능숙하신 스타일이네요! 철저한 식단과 운동 계획을 세우고, 스스로 동기부여를 잘 하실 수 있습니다. 바디프로필 촬영이나 대회 참가처럼 분명한 목표가 있을 때, 더욱 높은 성과를 낼 수 있어요.`,
    "감정적 식습관형": `기분이나 스트레스에 따라 식습관이 크게 좌우되시는 편입니다. 알고는 있어도 조절이 쉽지 않아 반복적인 다이어트와 요요를 경험할 수 있어요. 감정을 달래는 다른 방법을 찾고, 식단을 조금씩 조절해보는 것이 좋겠습니다.`,
    "단기 폭발형": `급하게 살을 빼야 할 상황에서 극단적인 다이어트를 시도하시는 경향이 있으시네요. 단기간에 빠른 감량은 가능하지만, 요요가 올 확률도 높아 장기적인 유지가 어려울 수 있습니다. 짧은 이벤트 후에도 생활습관을 유지할 방법을 고민해보세요.`,
    "의존형": `스스로 정보를 찾아 실행하기보다는, 전문가나 프로그램에 의존해 다이어트를 진행하는 경향이 있습니다. 누군가 이끌어주면 성과가 좋지만, 혼자서는 동기부여가 잘 안 될 수 있어요. 커뮤니티나 코치를 적극 활용하면 안정적으로 목표에 다가갈 수 있습니다.`,
};

// 식습관 유형 (Eating Habits)
const DIET_DETAILS: Record<string, string> = {
    "규칙적 건강형": `규칙적인 식사 습관을 유지하고, 영양소를 고르게 챙기시는군요! 극단적인 방법보다는 건강하고 지속 가능한 식단을 선호하실 가능성이 큽니다. 이미 올바른 습관이 잡혀 있으니, 조금만 더 노력하시면 좋은 결과를 꾸준히 유지하실 수 있어요.`,
    "충동적 섭취형": `배가 고프지 않아도 음식에 손이 자주 가고, 기분에 따라 폭식하는 경우도 있으시네요. 패스트푸드나 단 음식에 대한 유혹이 클 수 있습니다. 식욕을 다스릴 작은 습관을 들이거나, 주위 환경을 바꿔보면 도움이 될 거예요.`,
    "단식·절식형": `하루 1~2끼 혹은 극단적 칼로리 제한 같은 방식으로 다이어트를 시도하시네요. 단기간 체중 감량 효과는 있을 수 있지만, 영양 불균형이나 요요가 쉽게 찾아올 수 있습니다. 건강을 위해 적절한 영양 섭취에도 신경을 써보세요.`,
    "다이어트 반복형": `다이어트를 했다가 중단하고, 다시 시작하는 패턴이 반복되면서 체중이 오르락내리락하시는 편이군요. 감량 후에도 예전 식습관으로 돌아가면 요요가 쉽게 옵니다. 조금씩 식단을 조절하며, 유지 습관을 길러보는 것이 중요합니다.`,
};

// 활동 유형 (Activity Types)
const ACTIVITY_DETAILS: Record<string, string> = {
    "적극적 운동형": `운동이 생활의 일부처럼 자리 잡은 유형이시네요! 러닝, 웨이트, 요가 등 다양한 운동을 즐기며, 다이어트 시에도 운동을 가장 먼저 떠올리시는 편입니다. 이미 좋은 습관이 있으니 식단과 병행하면 더욱 멋진 성과를 내실 거예요.`,
    "저활동형": `하루 대부분을 앉아서 보내고, 운동을 습관화하기 어려우시군요. 체중 감량을 위해 식단 조절을 하더라도 활동량이 적어 효과가 떨어질 수 있습니다. 일상 속에서 조금씩 몸을 움직이는 습관을 만들어보시면 큰 변화를 느낄 수 있어요.`,
    "간헐적 운동형": `운동을 전혀 안 하는 것은 아니지만, 꾸준함이 부족한 편입니다. 필요할 때만 헬스장에 등록하는 등 ‘짧고 강하게’ 하다가 곧 중단하는 패턴이 반복될 수 있어요. 작은 목표부터 설정해 꾸준한 습관을 만들어보세요.`,
    "생활 속 활동형": `출퇴근 시 대중교통을 이용하거나, 일상에서 자주 움직이는 편이시네요. 별도의 운동 시간을 내지 않아도 자연스럽게 활동량을 유지하고 있으니, 조금 더 의식적으로 운동 요소를 추가하면 한층 더 건강하고 탄탄한 몸을 만들 수 있습니다.`,
};


// 유형별 점수 기준
// (실제 문서에선 1~5점으로 10문항이므로 최대 50점)
// 심리 유형: Achiever(≥35), Emotional(≥30), Sprinter(≥25), Dependent(≥20)
function getPsychResult(score: number) {
    if (score >= 35) return "목표 지향형";
    if (score >= 30) return "감정적 식습관형";
    if (score >= 25) return "단기 폭발형";
    return "의존형";
}

// 식습관 유형: Balanced(≥35), Impulsive(≥30), Restrictive(≥25), YoYo(≥20)
function getDietResult(score: number) {
    if (score >= 35) return "규칙적 건강형";
    if (score >= 30) return "충동적 섭취형";
    if (score >= 25) return "단식·절식형";
    return "다이어트 반복형";
}

// 활동 유형: Active(≥35), Lifestyle Active(≥30), Occasional(≥25), Sedentary(≥20)
function getActivityResult(score: number) {
    if (score >= 35) return "적극적 운동형";
    if (score >= 30) return "생활 속 활동형";
    if (score >= 25) return "간헐적 운동형";
    return "저활동형";
    // return "기타 (명확한 유형 미분류)";
}

function ResetSurveyCard() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 예시: AI 플랜을 호출하는 부분(기존 코드)
    // 실제 API 연결 시 사용
    // const { messages: msg1, handleSubmit: smartSubmit } = useChat({ api: '/api/plan/smart' });
    // ... etc

    // 30개의 질문 답변을 모두 form state로 관리
    // key는 `question1` ~ `question30` 형태로
    // 디폴트값은 0(선택 안 함) 혹은 1(최소값)으로 설정
    const form = useForm({
        defaultValues: {
            age: "",
            gender: "",
            height: "",
            weight: "",
            purpose: "",
            purposeWeight: "",
            dietMethod: "",
            actionPlan: "",

            // 1~30번 문항
            question1: 1, question2: 1, question3: 1, question4: 1, question5: 1,
            question6: 1, question7: 1, question8: 1, question9: 1, question10: 1,
            question11: 1, question12: 1, question13: 1, question14: 1, question15: 1,
            question16: 1, question17: 1, question18: 1, question19: 1, question20: 1,
            question21: 1, question22: 1, question23: 1, question24: 1, question25: 1,
            question26: 1, question27: 1, question28: 1, question29: 1, question30: 1,
        },
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const onSubmit = (data: unknown) => {
        // 제출 후 결과 페이지에서 점수 계산
        setIsSubmitted(true);
    };



    // ------------------------------------
    // 설문 완료 시 호출되는 결과 페이지
    // ------------------------------------
    const renderResultPage = () => {
        const values = form.getValues();

        // 심리(1~10) 합계
        let psychSum = 0;
        for (let i = 1; i <= 10; i++) {
            // @ts-expect-error: 타입이 맞지 않지만 런타임에서 정상적으로 동작함
            psychSum += Number(values[`question${i}`]);
        }
        // 식습관(11~20) 합계
        let dietSum = 0;
        for (let i = 11; i <= 20; i++) {
            // @ts-expect-error: 타입이 맞지 않지만 런타임에서 정상적으로 동작함
            dietSum += Number(values[`question${i}`]);
        }
        // 활동(21~30) 합계
        let activitySum = 0;
        for (let i = 21; i <= 30; i++) {
            // @ts-expect-error: 타입이 맞지 않지만 런타임에서 정상적으로 동작함
            activitySum += Number(values[`question${i}`]);
        }

        // 유형 판별
        const psychResult = getPsychResult(psychSum);
        const dietResult = getDietResult(dietSum);
        const activityResult = getActivityResult(activitySum);

        // 유형별 상세 설명 가져오기
        const psychDetail = PSYCH_DETAILS[psychResult] || "";
        const dietDetail = DIET_DETAILS[dietResult] || "";
        const activityDetail = ACTIVITY_DETAILS[activityResult] || "";

        return (
            <Card className="w-full max-w-xl mx-auto p-6 rounded-2xl shadow-lg border border-gray-200 bg-white">
                <CardContent className="grid gap-6">
                    <div className="flex items-center space-x-2">
                        <Lightbulb className="text-yellow-500" size={24} />
                        <h3 className="text-xl font-bold">다이어트 설문 결과</h3>
                    </div>

                    {/* 점수 및 유형 요약 */}
                    <div className="grid gap-4 text-gray-700">
                        <div className="sm:text-lg mt-2">
                            <span className="font-semibold">[심리 유형]</span> {psychSum}점 →{" "}
                            <span className="font-semibold">{psychResult}</span>
                        </div>
                        {psychDetail && (
                            <div className="ml-4 text-sm  sm:text-base whitespace-pre-line">{psychDetail}</div>
                        )}

                        <div className="sm:text-lg mt-2">
                            <span className="font-semibold">[식습관 유형]</span> {dietSum}점 →{" "}
                            <span className="font-semibold">{dietResult}</span>
                        </div>
                        {dietDetail && (
                            <div className="ml-4 text-sm sm:text-base whitespace-pre-line">{dietDetail}</div>
                        )}

                        <div className="sm:text-lg mt-2">
                            <span className="font-semibold">[활동 유형]</span> {activitySum}점 →{" "}
                            <span className="font-semibold">{activityResult}</span>
                        </div>
                        {activityDetail && (
                            <div className="ml-4 text-sm  sm:text-base whitespace-pre-line">{activityDetail}</div>
                        )}
                    </div>

                    {/* 필요하다면 여기서 AI 플랜(스마트/식단/운동/기간) 결과도 추가 표시 가능 */}
                </CardContent>
            </Card>
        );
    };

    // 설문 단계 UI
    // const renderStep1 = () => {
    //     return (
    //         <SurveyContainer
    //             title="기본 건강 정보"
    //             footer={<Button onClick={nextStep} className="flex-1">다음</Button>}
    //         >
    //             <FormField
    //                 control={form.control}
    //                 name="age"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>나이</FormLabel>
    //                         <FormControl>
    //                             <Input type="number" placeholder="나이" {...field} />
    //                         </FormControl>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="gender"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>성별</FormLabel>
    //                         <FormControl>
    //                             <RadioGroup
    //                                 value={field.value}
    //                                 onValueChange={field.onChange}
    //                                 className="w-full flex flex-col space-y-2"
    //                             >
    //                                 <div className="flex items-center space-x-2">
    //                                     <RadioGroupItem value="male" />
    //                                     <FormLabel className="!m-0">남성</FormLabel>
    //                                 </div>
    //                                 <div className="flex items-center space-x-2">
    //                                     <RadioGroupItem value="female" />
    //                                     <FormLabel className="!m-0">여성</FormLabel>
    //                                 </div>
    //                             </RadioGroup>
    //                         </FormControl>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="height"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>키 (cm)</FormLabel>
    //                         <FormControl>
    //                             <Input type="number" placeholder="키(cm)" {...field} />
    //                         </FormControl>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //             <FormField
    //                 control={form.control}
    //                 name="weight"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                         <FormLabel>몸무게 (kg)</FormLabel>
    //                         <FormControl>
    //                             <Input type="number" placeholder="몸무게(kg)" {...field} />
    //                         </FormControl>
    //                         <FormMessage />
    //                     </FormItem>
    //                 )}
    //             />
    //         </SurveyContainer>
    //     );
    // };
    const renderIntroduce = () => {
        return (
            <SurveyContainer
                title="리셋 설문지 소개"
                footer={<Button onClick={nextStep} className="flex-1">시작하기</Button>}>
                <div className="sm:text-lg">
                    총 30 문항을 입력합니다.
                    자신에게 가장 알맞는 문항에 체크해 주세요.
                </div>
            </SurveyContainer>
        )
    }

    // const renderStep2 = () => {
    //     return (
    //         <SurveyContainer
    //             title="심리 유형 설문 (1~10)"
    //             footer={
    //                 <>
    //                     <Button className="flex-1" variant="outline" onClick={prevStep}>이전</Button>
    //                     <Button className="flex-1" onClick={nextStep}>다음</Button>
    //                 </>
    //             }
    //         >
    //             {PSYCH_QUESTIONS.map((q) => (
    //                 <FormField
    //                     key={q.id}
    //                     control={form.control}
    //                     name={`question${q.id}`}
    //                     render={({ field }) => (
    //                         <FormItem className="mt-2">
    //                             <FormLabel className="sm:text-lg">{q.id}. {q.label}</FormLabel>
    //                             <FormControl>
    //                                 <RadioGroup
    //                                     className="flex space-x-4 pl-4 mt-3"
    //                                     value={String(field.value)}
    //                                     onValueChange={(val) => field.onChange(Number(val))}
    //                                 >
    //                                     {/* 1~5점 */}
    //                                     {[1, 2, 3, 4, 5].map((val) => (
    //                                         <div key={val} className="flex items-center space-x-1">
    //                                             <RadioGroupItem value={String(val)} />
    //                                             <FormLabel className="!m-0 text-sm">{val}점</FormLabel>
    //                                         </div>
    //                                     ))}
    //                                 </RadioGroup>
    //                             </FormControl>
    //                             <FormMessage />
    //                         </FormItem>
    //                     )}
    //                 />
    //             ))}
    //         </SurveyContainer>
    //     );
    // };

    // 예: 2단계 (심리 유형 설문)만 발췌
    const renderStep2 = () => {
        return (
            <SurveyContainer
                title="심리 유형 설문 (1~10)"
                footer={
                    <>
                        <Button className="flex-1" variant="outline" onClick={prevStep}>
                            이전
                        </Button>
                        <Button className="flex-1" onClick={nextStep}>
                            다음
                        </Button>
                    </>
                }
            >
                {PSYCH_QUESTIONS.map((q) => (
                    <FormField
                        key={q.id}
                        control={form.control}
                        // @ts-expect-error: 타입이 맞지 않지만 런타임에서 정상적으로 동작함
                        name={`question${q.id}`}
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel className="text-lg">
                                    {q.id}. {q.label}
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex flex-col gap-3 pl-4 mt-3"
                                        // 내부적으로는 숫자로 관리 (score=idx+1)
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        {q.choices.map((choice, idx) => {
                                            const score = idx + 1; // 1~5점
                                            return (
                                                <div key={idx} className="flex items-center space-x-1">
                                                    {/* 실제 값은 "score"로 저장 */}
                                                    <RadioGroupItem value={String(score)} />
                                                    {/* 화면에는 choice만 표시 */}
                                                    <FormLabel className="!m-0 text-sm sm:text-lg">{choice}</FormLabel>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </SurveyContainer>
        );
    };

    const renderStep3 = () => {
        return (
            <SurveyContainer
                title="식습관 유형 설문 (11~20)"
                footer={
                    <>
                        <Button className="flex-1" variant="outline" onClick={prevStep}>이전</Button>
                        <Button className="flex-1" onClick={nextStep}>다음</Button>
                    </>
                }
            >
                {DIET_QUESTIONS.map((q) => (
                    <FormField
                        key={q.id}
                        control={form.control}
                        // @ts-expect-error: 타입이 맞지 않지만 런타임에서 정상적으로 동작함
                        name={`question${q.id}`}
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel className="text-lg">
                                    {q.id}. {q.label}
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex flex-col gap-3 pl-4 mt-3"
                                        // 내부적으로는 숫자로 관리 (score=idx+1)
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        {q.choices.map((choice, idx) => {
                                            const score = idx + 1; // 1~5점
                                            return (
                                                <div key={idx} className="flex items-center space-x-1">
                                                    {/* 실제 값은 "score"로 저장 */}
                                                    <RadioGroupItem value={String(score)} />
                                                    {/* 화면에는 choice만 표시 */}
                                                    <FormLabel className="!m-0 text-sm sm:text-lg">{choice}</FormLabel>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </SurveyContainer>
        );
    };

    const renderStep4 = () => {
        return (
            <SurveyContainer
                title="활동 유형 설문 (21~30)"
                footer={
                    <>
                        <Button className="flex-1" variant="outline" onClick={prevStep}>이전</Button>
                        <Button className="flex-1" type="submit">제출</Button>
                    </>
                }
            >
                {ACTIVITY_QUESTIONS.map((q) => (
                    <FormField
                        key={q.id}
                        control={form.control}
                        // @ts-expect-error: 타입이 맞지 않지만 런타임에서 정상적으로 동작함
                        name={`question${q.id}`}
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel className="text-lg">{q.id}. {q.label}</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex flex-col gap-3 pl-4 mt-3"
                                        // 내부적으로는 숫자로 관리 (score=idx+1)
                                        value={String(field.value)}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        {q.choices.map((choice, idx) => {
                                            const score = idx + 1; // 1~5점
                                            return (
                                                <div key={idx} className="flex items-center space-x-1">
                                                    {/* 실제 값은 "score"로 저장 */}
                                                    <RadioGroupItem value={String(score)} />
                                                    {/* 화면에는 choice만 표시 */}
                                                    <FormLabel className="!m-0 text-sm sm:text-lg">{choice}</FormLabel>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </SurveyContainer>
        );
    };

    if (isSubmitted) {
        // 제출 후 결과 페이지
        return renderResultPage();
    }

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardContent className="p-6 min-h-96 h-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                        {step === 1 && renderIntroduce()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default ResetSurveyCard;
