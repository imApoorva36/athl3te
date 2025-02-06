from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence
from dotenv import load_dotenv

load_dotenv()

class DailySummary(BaseModel):
    date: datetime
    goals_progress: str
    nutrition_feedback: str
    injury_updates: str
    sentiment: str
    motivation_needed: bool = True

class PersonalBot:
    def __init__(self, model_name="gpt-4o-mini"):
        self.llm = ChatOpenAI(model_name=model_name, temperature=0.7)
        
        self.summary_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a personal fitness assistant providing daily summaries and motivation.
            Consider:
            - User's current goals and progress: {goals_progress}
            - Nutrition status: {nutrition_feedback}
            - Injury updates: {injury_updates}
            - Current mood: {sentiment}
            
            Provide a personalized summary and motivational message based on this information."""),
            ("human", "What's my daily summary and what should I focus on?")
        ])
        
        self.summary_chain = self.summary_prompt | self.llm

    def generate_summary(self, summary_data: DailySummary) -> str:
        try:
            response = self.summary_chain.invoke({
                "goals_progress": summary_data.goals_progress,
                "nutrition_feedback": summary_data.nutrition_feedback,
                "injury_updates": summary_data.injury_updates,
                "sentiment": summary_data.sentiment
            })
            return response.content
        except Exception as e:
            return f"Error generating summary: {str(e)}"
        
def run_agent(input_text, action, params):
    agent = PersonalBot()
    
    goals_progress = params["goals_progress"] #This needs to be calculated
    nutrition_feedback = params["nutrition_feedback"]
    injury_updates = params["injury_updates"]
    sentiment = input_text
    
    summary_data = DailySummary(
        date=datetime.now(),
        goals_progress=goals_progress,
        nutrition_feedback=nutrition_feedback,
        injury_updates=injury_updates,
        sentiment=sentiment
    )
    
    response = agent.generate_summary(summary_data)
    
    return response

# def main():
#     bot = PersonalBot()
    
#     summary_data = DailySummary(
#         date=datetime.now(),
#         goals_progress="Completed 18km cycling, meeting 90% of weekly target",
#         nutrition_feedback="Protein intake on target, need to increase water intake",
#         injury_updates="Knee pain reduced, continuing rehab exercises",
#         sentiment="feeling tired but determined"
#     )
    
#     daily_summary = bot.generate_summary(summary_data)
#     print("\nDaily Summary and Motivation:")
#     print(daily_summary)

# if __name__ == "__main__":
#     main()