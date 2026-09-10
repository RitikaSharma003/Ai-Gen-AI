import Groq from  "groq-sdk";


import "dotenv/config";
const client=new Groq({apiKey:process.env.GROQ_API_KEY});


class SimpleChatbot{
    constructor(systemPrompt="You are a  helpful assistant"){
        this.history=[{role:"system",content:systemPrompt}]
    }

async chat(userMessage)
{
    this.history.push({role:"user",content:userMessage});


    const response=await client.chat.completions.create({
model:"openai/gpt-oss-120b",
messages:this.history
    });



    const reply=response.choices[0].message.content;
    this.history.push({role:"assistant",content:reply});
    return reply;


}




}

async function main(){
    const bot=new SimpleChatbot("you are a friendly travel agent to guide . you like travel guide assistant ");


  console.log("Bot:", await bot.chat("I want to visit Switzerland. What should I see?"));
  console.log("Bot:", await bot.chat("How many days should I plan for that?"));  
  console.log("Bot:", await bot.chat("What's the best time of year to go?"));

}

main();
