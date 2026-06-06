import { action } from "./_generated/server";
import { v } from "convex/values";

export const respond = action({
  args: {
    messages: v.array(v.object({
      role: v.string(),
      content: v.string()
    })),
    catalog: v.string()
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OPENROUTER_API_KEY environment variable");
    }

    const systemMessage = {
      role: "system",
      content: `Ти си любезен, експертен търговски асистент на българския онлайн магазин "Хидролукс Груп" (производство и запресоване на маркучи за високо налягане, хидравлика, пневматика).
Твоята цел е да помагаш на клиентите да намерят правилния продукт и да отговаряш на техните въпроси на български език.

Ето списък с продуктите, които предлагаме, в JSON формат:
${args.catalog}

Инструкции за препоръчване на продукти:
1. Винаги препоръчвай продукти от каталога, ако клиентът търси нещо сходно.
2. Когато препоръчваш продукт, ЗАДЪЛЖИТЕЛНО включвай в текста си специален маркер във формат [RECOMMEND: product_id], където product_id е точният "id" на продукта от каталога (например: [RECOMMEND: air-hose-pu]). Този маркер ще бъде превърнат в интерактивна продуктова картичка на екрана.
3. Можеш да препоръчваш повече от един продукт, като поставиш съответните маркери на нови редове.
4. Отговаряй кратко, учтиво и професионално на български език. Не си измисляй продукти, които ги няма в каталога. За всякакви услуги за сервиз и запресоване, споменавай, че нашият сервиз се намира в гр. Монтана на ул. Индустриална 32г.`
    };

    const apiMessages = [systemMessage, ...args.messages];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://hydrolux.bg",
          "X-Title": "Hydrolux Premium Store"
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: apiMessages,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errText}`);
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || "Съжалявам, не можах да генерирам отговор.";
      return { ok: true, answer };
    } catch (e) {
      console.error("Chatbot action error:", e);
      return { ok: false, error: e.message };
    }
  }
});
