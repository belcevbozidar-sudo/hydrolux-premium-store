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
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${apiKey}`;
    const response = await fetch(googleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        numberOfImages: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "1:1"
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: {
          message: errData.error?.message || response.statusText
        }
      });
    }

    const resData = await response.json();
    return res.status(200).json(resData);
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.message || 'Internal Server Error'
      }
    });
  }
}
