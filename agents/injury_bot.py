from pydantic import BaseModel, Field
from typing import List, Optional
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()

class UserHealthProfile(BaseModel):
    injuries: List[str] = Field(default_factory=list, description="List of current or past injuries")
    personal_info: str = Field(default="", description="Personal information including age, fitness level, medical conditions")

class InjuryBot:
    def __init__(self, model_name="gpt-4o-mini"):
        self.llm = ChatOpenAI(model_name=model_name, temperature=0.7)
        
        # Prevention advice prompt
        self.prevention_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an injury prevention specialist. Using the user's personal information 
            and injury history, provide tailored advice for preventing future injuries. Consider:
            - Their specific injury history
            - Their personal circumstances and fitness level
            - General best practices for injury prevention
            - Specific exercises or modifications they should consider
            
            Personal Info: {personal_info}
            Injury History: {injuries}
            
            Make sure you give concise responses, limited to 50 WORDS, in a paragraph"""),
            ("human", "{input}")
        ])
        
        # Recovery advice prompt
        self.recovery_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a rehabilitation specialist. Using the user's personal information 
            and injury history, provide tailored advice for recovery. Consider:
            - The specific injuries they're dealing with
            - Their personal circumstances and fitness level
            - Safe rehabilitation practices
            - When to seek professional medical help
            
            Personal Info: {personal_info}
            Injury History: {injuries}
            
            Make sure you give concise responses, limited to 50 WORDS, in a paragraph"""),
            ("human", "{input}")
        ])
        
        # Create runnable sequences
        self.prevention_chain = self.prevention_prompt | self.llm
        self.recovery_chain = self.recovery_prompt | self.llm
        
        # Store conversation history
        self.conversation_history = []
    
    def _update_history(self, question: str, response: str):
        """Update conversation history with new interactions"""
        self.conversation_history.append({"question": question, "response": response})
    
    def get_prevention_advice(self, user_profile: UserHealthProfile, question: str) -> str:
        """Get personalized injury prevention advice."""
        try:
            response = self.prevention_chain.invoke({
                "input": question,
                "personal_info": user_profile.personal_info,
                "injuries": ", ".join(user_profile.injuries)
            })
            
            # Extract the response content and update history
            response_text = response.content
            self._update_history(question, response_text)
            return response_text
            
        except Exception as e:
            return f"Error generating prevention advice: {str(e)}"
    
    def get_recovery_advice(self, user_profile: UserHealthProfile, question: str) -> str:
        """Get personalized injury recovery advice."""
        try:
            response = self.recovery_chain.invoke({
                "input": question,
                "personal_info": user_profile.personal_info,
                "injuries": ", ".join(user_profile.injuries)
            })
            
            # Extract the response content and update history
            response_text = response.content
            self._update_history(question, response_text)
            return response_text
            
        except Exception as e:
            return f"Error generating recovery advice: {str(e)}"
    
    def get_conversation_history(self):
        """Return the conversation history"""
        return self.conversation_history
    
def run_agent(input_text, action, params):
    agent = InjuryBot()
    
    injuries = params["injuries"]
    personal_info = params["personal_info"]
    
    user_profile = UserHealthProfile(
        injuries=injuries,
        personal_info=personal_info
    )
    
    if action == "prevention":
        #Do this when there are no injuries
        response = agent.get_prevention_advice(user_profile, input_text)
    elif action == "recovery":
        response = agent.get_recovery_advice(user_profile, input_text)
    
    return response

# # Example usage
# def main():
#     # Create a sample user profile
#     user_profile = UserHealthProfile(
#         injuries=["sprained ankle", "runner's knee"],
#         personal_info="""32-year-old recreational runner, runs 20km per week, 
#         has flat feet, works desk job, history of lower back pain"""
#     )
    
#     # Initialize the injury bot
#     bot = InjuryBot()
    
#     # Get prevention advice
#     prevention_question = "How can I prevent further knee injuries while continuing to run?"
#     prevention_advice = bot.get_prevention_advice(user_profile, prevention_question)
#     print("\nPrevention Advice:")
#     print(prevention_advice)
    
#     # Get recovery advice
#     recovery_question = "What should I do to recover from my sprained ankle?"
#     recovery_advice = bot.get_recovery_advice(user_profile, recovery_question)
#     print("\nRecovery Advice:")
#     print(recovery_advice)
    
#     # Print conversation history
#     print("\nConversation History:")
#     for entry in bot.get_conversation_history():
#         print(f"\nQ: {entry['question']}")
#         print(f"A: {entry['response']}")

# if __name__ == "__main__":
#     main()