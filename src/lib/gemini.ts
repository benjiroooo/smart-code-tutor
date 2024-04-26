import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export const runtime = 'edge';

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = '',
  output_value_only: boolean = false,
  model: string = 'gemini-pro',
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  // if the user input is in a list, we also process the output as a list of json
  const list_input: boolean = Array.isArray(user_prompt);
  // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  // start off with no error message
  let error_msg: string = '';

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${
      list_output && 'an array of objects in'
    } the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    // if output_format contains dynamic elements, process it accordingly
    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    // if input is in a list format, ask it to generate json in a list
    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
    }

    console.log('before response');

    // Ask Google Generative AI for a streaming completion given the prompt
    const response = await genAI
      .getGenerativeModel({
        model: 'gemini-pro',
        generationConfig: {
          temperature: temperature,
        },
      })
      .generateContentStream({
        contents: [
          { role: 'user', parts: [{ text: 'stop' }] },
          {
            role: 'model',
            parts: [{ text: system_prompt + output_format_prompt + error_msg }],
          },
          { role: 'user', parts: [{ text: user_prompt.toString() }] },
        ],
      });

    console.log('response:', (await response.response).text);
    const content = await response.response;

    let res: string = content.text.toString().replace(/'/g, '"') ?? '';
    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    // let res: string = content.replace(/'/g, '"') ?? "";

    // ensure that we don't replace away apostrophes in text
    // res = res.replace(/(\w)"(\w)/g, "$1'$2");

    if (verbose) {
      console.log(
        'System prompt:',
        system_prompt + output_format_prompt + error_msg
      );
      console.log('\nUser prompt:', user_prompt);
      console.log('\nGemini response:', content);
      // console.log('\nGemini response:', res);
    }

    // try-catch block to ensure output format is adhered to
    try {
      let output: any = JSON.parse(content.text.toString());
      // let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error('Output format not in an array of json');
        }
      } else {
        output = [output];
      }

      // check for each element in the output_list, the format is correctly adhered to
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          // unable to ensure accuracy of dynamic output header, so skip it
          if (/<.*?>/.test(key)) {
            continue;
          }

          // if output field missing, raise an error
          if (!(key in output[index])) {
            throw new Error(`${key} not in json output`);
          }

          // check that one of the choices given for the list of words is an unknown
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            // ensure output is not a list
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            // output the default category (if any) if GPT is unable to identify the category
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            // if the output is a description format, get only the label
            if (output[index][key].includes(':')) {
              output[index][key] = output[index][key].split(':')[0];
            }
          }
        }

        // if we just want the values for the outputs
        if (output_value_only) {
          output[index] = Object.values(output[index]);
          // just output without the list if there is only one element
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      
      // Check if it parsed as an object (which would be expected JSON)
      console.log('Raw Gemini Response:', content);
      console.log('Type of content.text:', typeof content.text);
      console.log('Type of content.text:', typeof content);
      console.error('Response Content:', content.text.toString()); // Log raw response   
      
      return list_input ? output : output[0];

    } catch (e) {
      console.error('Response Content:', content.text.toString()); // Log raw response
      error_msg = `\n\nResult: ${content}\n\nError message: ${e}`;
      console.log('An exception occurred:', e);
      console.log('Current invalid json format ', content);
    }
  }

  return [];
}
