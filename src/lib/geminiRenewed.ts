// node --version # Should be >= 18
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = process.env.GEMINI_API_KEY;

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function runChat(
  topic: string | string[],
  output_format: OutputFormat,
  num_tries: number = 3
) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const allQuestions = [];

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  console.log('before looping...');

  for (let i = 0; i <= num_tries; i++) {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: `You are to output an array of objects in the following in json format: ${JSON.stringify(
                output_format
              )} Do not put quotation marks or escape character \\\\ in the output fields. If output field is a list, classify output into the best element of the list. Any text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {"<location>": "description of location"}, Example output: {"school": "a place for education"} Generate an array of json, one json for each input element.`,
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: '[\n  {\n    director: "D.J. Caruso",\n    genre: [\n      "Action",\n      "Thriller"\n    ],\n    language: "English",\n    name: "xXx: Return of Xander Cage",\n    released: 2017,\n    studio: "Paramount Pictures"\n  },\n  {\n    director: "F. Gary Gray",\n    genre: [\n      "Action",\n      "Thriller"\n    ],\n    language: "English",\n    name: "The Fate of the Furious",\n    released: 2017,\n    studio: "Universal Pictures"\n  },\n  {\n    director: "James Wan",\n    genre: [\n      "Action",\n      "Adventure",\n      "Fantasy"\n    ],\n    language: "English",\n    name: "Aquaman",\n    released: 2018,\n    studio: "Warner Bros. Pictures"\n  },\n  {\n    director: "Ryan Coogler",\n    genre: [\n      "Action",\n      "Adventure",\n      "Science Fiction"\n    ],\n    language: "English",\n    name: "Black Panther",\n    released: 2018,\n    studio: "Marvel Studios"\n  }\n]',
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: `You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array You are to generate a random hard mcq question about ${topic}. Like this:{          "question": \"question\", "answer": \"answer with max length of 15 words\", "option1": \"option1 with max length of 15 words\", "option2": \"option2 with max length of 15 words\",          "option3": \"option3 with max length of 15 words\",}`,
            },
          ],
        },
        {
          role: 'model',
          parts: [{ text: '<Model generates MCQ question here>' }],
        },
      ],
    });

    const result = await chat.sendMessage(
      `You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array You are to generate a random hard mcq question about ${topic}. Like this:{ "question": "question", "answer": "answer with max length of 15 words", "option1": "option1 with max length of 15 words", "option2": "option2 with max length of 15 words", "option3": "option3 with max length of 15 words"}`
    );

    function processResponse(responseText: string) {
      console.log('Response:', responseText);
      // const jsonString = responseText.match(/\{(.*)\}/s)[1];
      const jsonStrings = responseText.match(/\{(.*?)\}/gs);
      // const questionsData = JSON.parse(jsonStrings); // Assuming it's a valid JSON array
      const questionsData: any = [];
      console.log('Parsed:', questionsData);
      for (const jsonString of jsonStrings!) {
        questionsData.push(JSON.parse(jsonString)); 
      }
      return questionsData;
    }
    const response = result.response;
    console.log(response.text());

    const generatedQuestions = processResponse(response.text());
    allQuestions.push(...generatedQuestions);
  }
  return allQuestions;
}
