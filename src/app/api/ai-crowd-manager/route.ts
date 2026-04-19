import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { attendees, venueSize, eventType } = await request.json();
    
    // In a real app we would call OpenAI/Gemini SDK here
    // For now we simulate an AI logic analysis response
    
    let density = parseInt(attendees) / parseInt(venueSize); // per square foot/meter
    
    let suggestions = [];
    let riskLevel = "Low";
    
    if (density > 2) {
      riskLevel = "High";
      suggestions.push("Highly dense crowd expected. Implement strict zoning and multi-point exits.");
      suggestions.push(`Deploy at least ${Math.ceil(parseInt(attendees) / 50)} security personnel.`);
    } else if (density > 1) {
      riskLevel = "Moderate";
      suggestions.push("Moderate density. Ensure clear pathways to bathrooms and exits.");
      suggestions.push(`Deploy at least ${Math.ceil(parseInt(attendees) / 100)} security personnel.`);
    } else {
      suggestions.push("Spacious flow expected. Standard management protocols are sufficient.");
    }
    
    if (eventType === 'music' || eventType === 'college') {
         suggestions.push("Expect high energetic movement. Secure front-stage barriers.");
    }

    // Simulate network delay for AI feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({
      riskLevel,
      suggestions,
      predictedFlow: density > 1.5 ? "Bottlenecks likely near entrances." : "Smooth entry expected."
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process AI analysis" }, { status: 500 });
  }
}
