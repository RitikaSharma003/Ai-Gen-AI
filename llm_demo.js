
import Groq from  "groq-sdk";


import "dotenv/config";

const client = new Groq({apiKey:process.env.GROQ_API_KEY});

async function  main(){
const response=await client.chat.completions.create(
	{
		model:"openai/gpt-oss-120b",
		messages:[{role:"user",content:"explain what is generative ai?"}]
	});
	console.log(response.choices[0].message.content);

}
main();
