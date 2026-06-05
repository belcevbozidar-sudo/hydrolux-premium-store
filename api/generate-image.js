export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  const { apiKey, prompt } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: { message: 'API key is required' } });
  }
  if (!prompt) {
    return res.status(400).json({ error: { message: 'Prompt is required' } });
  }

  try {
    // Call gemini-3.1-flash-image using generateContent to support the free tier Google AI Studio keys
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${apiKey}`;
    const response = await fetch(googleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"]
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: {
          message: errData.error?.message || response.statusText || 'Error from Google API'
        }
      });
    }

    const resData = await response.json();
    const parts = resData.candidates?.[0]?.content?.parts || [];
    let imgBytes = '';
    
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        imgBytes = part.inlineData.data;
        break;
      }
    }

    if (!imgBytes) {
      return res.status(502).json({
        error: {
          message: 'No image data returned from Gemini. Response structure: ' + JSON.stringify(resData)
        }
      });
    }

    // Map response structure to match the frontend expectation in js/admin.js
    return res.status(200).json({
      generatedImages: [
        {
          image: {
            imageBytes: imgBytes
          }
        }
      ]
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.message || 'Internal Server Error'
      }
    });
  }
}
