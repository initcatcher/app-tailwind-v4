import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
    try {
        const { data } = await req.json();

        const prompt = `사용자의 다이어트 방법에 맞춰 하루 식단을 간단하게 추천해주세요.
각 식사는 한 문장으로 요약해서 제공하고, 최대 3줄을 넘지 마세요.

예시:
- 아침: 오트밀 + 바나나 + 그릭요거트
- 점심: 닭가슴살 샐러드 + 현미밥
- 저녁: 연어구이 + 채소볶음

사용자 정보:
- 다이어트 방법: ${data.dietMethod}
`;

        const result = streamText({
            model: openai('gpt-4o'),
            system: prompt,
            messages: [],
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: '식단 추천 생성 중 오류 발생' }, { status: 500 });
    }
}
