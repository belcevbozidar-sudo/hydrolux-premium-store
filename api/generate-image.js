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
    // Use the active Imagen 4 model endpoint (imagen-4.0-generate-001)
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
    const response = await fetch(googleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        instances: [
          {
            prompt: prompt
          }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1",
          outputMimeType: "image/jpeg"
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
    const imgBytes = resData.predictions?.[0]?.bytesBase64Encoded;

    if (!imgBytes) {
      return res.status(502).json({
        error: {
          message: 'No image bytes found in Google response. Response structure: ' + JSON.stringify(resData)
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
