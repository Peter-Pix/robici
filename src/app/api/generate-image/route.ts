// /api/generate-image — Generování omalovánek přes OpenRouter (Flux Schnell)
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const coloringPrompts: Record<string, string> = {
  'rodina': `Black and white coloring page, thick black outlines, simple shapes, white background. The whole Robik family of cute robots standing together: Pepa (young robot with antenna hair, oversized sweater), Marie (elegant robot in yellow coat), Gustav (old robot with glasses and wire beard), Betka (slim robot with painter hat), Mirek (boxy server robot), Franta (energetic robot with tie), Anicka (small round robot with bow), Emil (robot with chest display), Zdena (kind robot). Jozin the robot cat sleeping at their feet. Kids coloring book style, clean lines, no shading.`,
  'pepa': `Black and white coloring page, thick black outlines, simple shapes, white background. Pepa the young robot copywriter. Messy antenna hair, oversized sweater, holding a tablet, sitting at a desk. Cute, friendly expression. Kids coloring book style, clean lines, no shading.`,
  'betka': `Black and white coloring page, thick black outlines, simple shapes, white background. Betka the robot graphic designer. Slim, mechanical arms, painter hat, holding a digital pen, focused on drawing. Kids coloring book style, clean lines, no shading.`,
  'gustav': `Black and white coloring page, thick black outlines, simple shapes, white background. Gustav the old robot QA tester. Big glasses, wire beard, holding a magnifying glass. Grumpy but kind expression. Kids coloring book style, clean lines, no shading.`,
  'mirek': `Black and white coloring page, thick black outlines, simple shapes, white background. Mirek the robot technician. Boxy server-like body, glowing diodes, serious expression. Kids coloring book style, clean lines, no shading.`,
  'marie': `Black and white coloring page, thick black outlines, simple shapes, white background. Marie the robot operations manager. Elegant, professional coat, holding coffee and tablet. Strict but kind expression. Kids coloring book style, clean lines, no shading.`,
  'franta': `Black and white coloring page, thick black outlines, simple shapes, white background. Franta the robot salesman. Energetic, wearing a tie, gesturing with hands, excited expression. Kids coloring book style, clean lines, no shading.`,
  'anicka': `Black and white coloring page, thick black outlines, simple shapes, white background. Anicka the small round robot. Wearing a bow, heart-shaped eyes, smiling. Cute and friendly. Kids coloring book style, clean lines, no shading.`,
  'emil': `Black and white coloring page, thick black outlines, simple shapes, white background. Emil the robot analyst. Square glasses, chest display with graphs, rigid posture, serious expression. Kids coloring book style, clean lines, no shading.`,
  'jozin': `Black and white coloring page, thick black outlines, simple shapes, white background. Jozin the small robot cat. Metal body, ears, cable tail, glowing eyes. Sleeping on his side. Cute. Kids coloring book style, clean lines, no shading.`,
};

export async function POST(req: NextRequest) {
  const { character = 'rodina' } = await req.json();

  const prompt = coloringPrompts[character] || coloringPrompts.rodina;

  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://robici-sro.vercel.app',
        'X-Title': 'Robíci - AI Omalovánky',
      },
      body: JSON.stringify({
        model: 'black-forest-labs/flux-schnell',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `OpenRouter error: ${response.status} ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Flux Schnell vrací markdown s URL obrázku
    const urlMatch = content.match(/https?:\/\/[^\s]+\.(png|jpg|jpeg|webp)/i);
    const imageUrl = urlMatch ? urlMatch[0] : null;

    return NextResponse.json({ image: imageUrl, raw: content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
