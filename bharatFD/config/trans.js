const axios = require("axios");
const redis = require("redis");

const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect();

const translateText = async (text, sourceLang, targetLang) => {
  const cacheKey = `translate_${text}_${sourceLang}_${targetLang}`;
  const cachedTranslation = await client.get(cacheKey);

  if (cachedTranslation) return cachedTranslation;

  try {
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const translation = response.data[0][0][0];

    await client.set(cacheKey, translation, { EX: 86400 }); 
    return translation;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; 
  }
};

module.exports = { translateText };
