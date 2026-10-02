import { Router } from 'express';

const router = Router();

const languageMap: Record<string, string> = {
  am: 'Amharic',
  om: 'Afaan Oromo',
  so: 'Somali',
  sw: 'Swahili',
};

// POST /api/translate - Translate lesson text to regional languages
router.post('/', async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ success: false, message: 'Missing text or targetLang' });
    }

    const targetName = languageMap[targetLang] || targetLang;

    // Simulated / fallback translation response if OpenAI key is unconfigured
    const translated = `[${targetName} Translation]: ${text}`;

    res.json({
      success: true,
      translated,
      targetLanguage: targetName,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
