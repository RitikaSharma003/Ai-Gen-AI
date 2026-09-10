import Groq from "groq-sdk";
const client=new Groq({dangerouslyAllowBrowserpiKey:process.env.GROQ_API_KEY});

async function ask(prompt,system=null)
{
    const  messages=[];
    if(system) messages.push({role:"system",content:system});
messages.push({role:"user",content:"prompt"});
const response=await client.chat.completions.create({
    model:"openai/gpt-oss-120b",
    messages:messages
});


return response.choices[0].message.content;

}

async function main(){
    const answer1=await ask(
        "What should I eat before a workout?",
    "You are a friendly fitness coach who gives short, practical tips.");
    console.log("with role:",answer1);
    
  const fewShot = `
Convert to a professional tone:

Input: "hey can u send that report asap"
Output: "Hi, could you please send the report as soon as possible?"

Input: "yo whats the status on this"
Output: "Hello, could you share an update on the status of this?"

Input: "need that file rn"
Output:
`;

console.log("\nFew-Shot:",await ask(fewShot));


const structuredPrompt=`Extract the name, age, and city from this text and return ONLY valid JSON, nothing else:

"Hi, I'm Rahul, 25 years old, living in Bangalore."`;



console.log("\nStructured output:",await ask(structuredPrompt));




}
main();
