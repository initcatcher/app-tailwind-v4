import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
    try {
        const { data } = await req.json();

        const prompt = `사용자의 현재 체중과 목표 체중을 비교하여 예상 달성 기간을 3줄 이내로 요약해주세요.
주당 감량 속도를 고려하여 현실적인 기간을 제공하세요.

예시:
- 목표: 5kg 감량
- 예상 기간: 7~9주
- 핵심: 주당 0.6kg 감량 속도로 안전한 감량 진행

사용자 정보:
- 현재 체중: ${data.weight}kg
- 목표 체중: ${data.purposeWeight}kg
- 주당 감량 목표: ${data.weeklyWeightLossTarget}kg`;

        const result = streamText({
            model: openai('gpt-4o'),
            system: prompt,
            messages: [],
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: '목표 달성 기간 계산 중 오류 발생' }, { status: 500 });
    }
}
