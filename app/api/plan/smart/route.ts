import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
    try {
        const { messages, data } = await req.json();
        console.log(data)

        const prompt = `당신은 전문적인 다이어트 컨설턴트입니다. 아래 사용자의 정보를 바탕으로 다이어트 플랜을 작성해주세요.
3줄 이내로 요약해서 제공하세요. 간결하면서 핵심적인 내용만 전달해주세요.

예시: 
- 목표: 3kg 감량 (4주)
- 방법: 간헐적 단식 + 주 4회 운동
- 핵심: 하루 1500kcal 유지, 근력+유산소 병행

사용자 정보:
- 나이: ${data.age}
- 성별: ${data.gender}
- 키: ${data.height}cm
- 현재 체중: ${data.weight}kg
- 목표 체중: ${data.purposeWeight}kg
- 다이어트 방법: ${data.dietMethod}
`;

        const result = streamText({
            model: openai('gpt-4o'),
            system: prompt,
            messages,
            tools: {
                // 필요한 경우 도구 정의 추가
            },
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: '다이어트 플랜 생성 중 오류 발생' }, { status: 500 });
    }
}
