import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, manipulationType } = await req.json();
    
    if (!question) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Processing question manipulation:', { manipulationType, questionLength: question.length });

    const systemPrompts: Record<string, string> = {
      rephrase: `You are an expert chemistry teacher. Rephrase the following IB Chemistry question using different wording while keeping the exact same meaning and difficulty level. Keep the multiple choice options if present. Only output the rephrased question, nothing else.`,
      
      simplify: `You are an expert chemistry teacher. Create a simpler version of this IB Chemistry question that tests the same concept but is easier to understand. Use simpler language and provide clearer context. Keep the multiple choice format if present, but make options more straightforward. Only output the simplified question, nothing else.`,
      
      advanced: `You are an expert chemistry teacher. Create a more challenging version of this IB Chemistry question. Add complexity by requiring deeper analysis, combining concepts, or requiring multi-step reasoning. Keep the multiple choice format if present. Only output the advanced question, nothing else.`,
      
      similar: `You are an expert chemistry teacher. Create a completely new question that tests the same chemistry concept/topic as the original but uses different numbers, molecules, or scenarios. Keep the same question format and difficulty level. Only output the new question, nothing else.`,
    };

    const prompt = systemPrompts[manipulationType] || systemPrompts.rephrase;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: question }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const manipulatedQuestion = data.choices?.[0]?.message?.content;

    if (!manipulatedQuestion) {
      throw new Error("No response from AI");
    }

    console.log('Successfully manipulated question');

    return new Response(
      JSON.stringify({ 
        original: question,
        manipulated: manipulatedQuestion,
        type: manipulationType 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in manipulate-question:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to manipulate question' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
