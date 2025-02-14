import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
    try {
        const { data } = await req.json();

        const prompt = `사용자의 목표 체중 감량을 위해 하루 운동 플랜을 간결하게 작성해주세요.
유산소와 근력 운동을 포함하되, 최대 3줄 이내로 요약하세요.

예시:
- 유산소: 아침 30분 빠르게 걷기
- 근력: 스쿼트 3세트 + 푸쉬업 3세트
- 핵심: 주 5회 반복, 점진적 강도 증가

사용자 정보:
- 현재 체중: ${data.weight}kg
- 목표 체중: ${data.purposeWeight}kg
- 운동 경험: ${data.fitnessLevel}
`;

        const result = streamText({
            model: openai('gpt-4o'),
            system: prompt,
            messages: [],
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: '운동 플랜 생성 중 오류 발생' }, { status: 500 });
    }
}
