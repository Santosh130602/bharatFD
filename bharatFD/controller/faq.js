const FAQ = require("../models/faq");
const { translateText } = require("../config/trans");


exports.createFAQ = async (req, res) => {
  try {
    let { question, answer, language } = req.body;

    let question_en = question;
    let answer_en = answer;
    let question_hi = question;
    let answer_hi = answer;
    let question_bn = question;
    let answer_bn = answer;

    const sourceLang = language || 'en'; 

    // Only translate if needed
    if (sourceLang !== 'en') {
      question_en = await translateText(question, sourceLang, 'en');
      answer_en = await translateText(answer, sourceLang, 'en');
    }
    if (sourceLang !== 'hi') {
      question_hi = await translateText(question, sourceLang, 'hi');
      answer_hi = await translateText(answer, sourceLang, 'hi');
    }
    if (sourceLang !== 'bn') {
      question_bn = await translateText(question, sourceLang, 'bn');
      answer_bn = await translateText(answer, sourceLang, 'bn');
    }

    const faq = new FAQ({
      question,
      answer,
      question_en,
      answer_en,
      question_hi,
      answer_hi,
      question_bn,
      answer_bn,
    });

    await faq.save();

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Error creating FAQ", error });
  }
};






exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang;
    const faqs = await FAQ.find();

    if (!lang) {
      // Show all languages if no specific language is requested
      const allLanguagesFAQs = faqs.map((faq) => ({
        id: faq._id,
        question: {
          en: faq.question,
          hi: faq.question_hi,
          bn: faq.question_bn,
        },
        answer: {
          en: faq.answer,
          hi: faq.answer_hi,
          bn: faq.answer_bn,
        },
      }));
      return res.status(200).json(allLanguagesFAQs);
    }

    // Show specific language FAQs
    const translatedFAQs = faqs.map((faq) => ({
      id: faq._id,
      question: lang === "hi" ? faq.question_hi : lang === "bn" ? faq.question_bn : faq.question,
      answer: lang === "hi" ? faq.answer_hi : lang === "bn" ? faq.answer_bn : faq.answer,
    }));

    res.status(200).json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};
