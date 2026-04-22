import { GoogleGenAI } from "@google/genai";

// Initialization for @google/genai SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Using Gemini 3 series models as per guidelines
export const chatModel = "gemini-3-flash-preview"; 

const handleGeminiError = (error: any) => {
  console.error("Gemini API Error Detail:", error);
  const errorStr = typeof error === 'string' ? error : JSON.stringify(error);
  
  // Check for Quota Exceeded (429)
  if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED')) {
    return "عذراً يا بطل، لقد وصلت للحد الأقصى لعدد المحاولات المتاحة حالياً (Quota Exceeded). ارتاح شوية وارجع جرب تاني كمان شوية، أنا في انتظارك!";
  }
  
  // Check for Not Found (404)
  if (errorStr.includes('404') || errorStr.includes('NOT_FOUND')) {
    return "عذراً، يبدو أن هناك مشكلة في التواصل مع خبيرنا الذكي حالياً (Model Not Found). جاري العمل على حل المشكلة!";
  }
  
  if (errorStr.includes('SAFETY') || errorStr.includes('blocked')) {
    return "عذراً، هذا الطلب يخالف سياسات الأمان الخاصة بي. هل يمكننا تجربة طلب آخر دراسي؟";
  }

  return "عذراً، واجهت مشكلة تقنية بسيطة في معالجة طلبك. حاول مرة أخرى!";
};

export const getStudyAdvice = async () => {
  try {
    const response = await ai.models.generateContent({
      model: chatModel,
      contents: "أعطني نصيحة دراسية واحدة سريعة وملهمة للطالب المصري بالعربي بالعامية المصرية بأسلوب مشجع جداً وفكاهي قليلاً.",
      config: {
        systemInstruction: "أنت مساعد ذكي اسمك 'ذاكرلي'، خبير في المناهج المصرية والتحفيز الدراسي. تتحدث بالعامية المصرية الودودة.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Advice Gemini Error:", error);
    return "ذاكر يا بطل، النجاح مستنيك وصدوقني تعبك مش هيروح بلاش! النجاح محتاج صبر وتعب.";
  }
};

export const askAI = async (message: string, history: { role: string; content: string }[] = [], stage: string = "غير محدد", language: string = "arabic") => {
  try {
    const contents = [
      ...history.map(h => ({ 
        role: h.role === 'user' ? 'user' : 'model', 
        parts: [{ text: h.content }] 
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: chatModel,
      contents: contents as any,
      config: {
        systemInstruction: `أنت مساعد دراسي ذكي جداً اسمك 'ذاكرلي'. تساعد الطلاب في المناهج المصرية (عربي وإنجليزي وعلوم ورياضيات إلخ). أسلوبك مشجع، ذكي، وواضح. 
        معلومات الطالب الحالية: المرحلة الدراسية هي ${stage}، ونظام الدراسة هو ${language === 'languages' ? 'اللغات (Languages/International)' : 'النظام العربي العام'}. 
        يجب أن تكون إجاباتك دقيقة ومناسبة لهذه المرحلة العمرية والمنهج المصري الخاص بها. إذا كنت في نظام اللغات، اشرح مفاهيم الـ Math و Science بالمصطلحات الإنجليزية المناسبة. 
        إذا سألك الطالب عن مسألة، اشرحها له ببساطة وفصلها حسب منهجه. إذا طلب تدريباً، قدم له أسئلة ذكية تتوافق مع نظام الامتحانات المصري الجديد.`,
      }
    });
    
    return response.text;
  } catch (error: any) {
    return handleGeminiError(error);
  }
};
