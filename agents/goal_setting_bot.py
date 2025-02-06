from pydantic import BaseModel, Field
from typing import Optional
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

# Base Goal Model
class BaseGoal(BaseModel):
    frequency: Optional[float] = Field(default=None, description="Frequency of the goal in days, how often the goal has to be attained, in number of days")
    duration: Optional[float] = Field(default=None, description="Duration of the goal in days")

# Sports Goal Model
class SportsGoal(BaseGoal):
    distance: Optional[float] = Field(default=None, description="Distance target in kilometers")
    time: Optional[float] = Field(default=None, description="Time target in minutes")
    speed: Optional[float] = Field(default=None, description="Speed target in kilometers per hour")
    calories: Optional[float] = Field(default=None, description="Calories to burn")

# Nutrition Goal Model
class NutritionGoal(BaseGoal):
    protein: Optional[float] = Field(default=None, description="Protein target in grams")
    fats: Optional[float] = Field(default=None, description="Fats target in grams")
    carbs: Optional[float] = Field(default=None, description="Carbohydrates target in grams")
    calories_consumed: Optional[float] = Field(default=None, description="Calories consumption target")
    water_consumed: Optional[float] = Field(default=None, description="Water consumption target in milliliters")

# User Goal Model
class UserGoal(BaseModel):
    cycling: Optional[SportsGoal] = Field(default=None, description="Cycling goals")
    running: Optional[SportsGoal] = Field(default=None, description="Running goals")
    swimming: Optional[SportsGoal] = Field(default=None, description="Swimming goals")
    walking: Optional[SportsGoal] = Field(default=None, description="Walking goals")
    nutrition: Optional[NutritionGoal] = Field(default=None, description="Nutrition goals")

# Goal Setting Agent
class GoalSettingAgent:
    def __init__(self, model_name="gpt-4o-mini"):
        self.llm = ChatOpenAI(model_name=model_name)
        self.parser = PydanticOutputParser(pydantic_object=UserGoal)
        
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a fitness and nutrition goal setting assistant. 
            Your task is to convert user's natural language goal descriptions into structured data.
            Parse the user's input and create appropriate goals for cycling, running, swimming, walking, and nutrition.
            Only include fields and activities that are explicitly mentioned or can be clearly inferred from the user's input.
            Set any unmentioned fields to null.
            For mentioned activities, ensure all numerical values are reasonable and aligned with the user's description.
            If the user talks about anything other than setting goals, then set all fields to null! You are to STRICTLY answer about goal setting.
            
            {format_instructions}"""),
            ("human", "Here is the what the user said: {user_input}")
        ])

    def parse_goal(self, user_input: str) -> UserGoal:
        format_instructions = self.parser.get_format_instructions()
        
        chain = self.prompt | self.llm | self.parser
        
        try:
            result = chain.invoke({
                "user_input": user_input,
                "format_instructions": format_instructions
            })
            return result
        except Exception as e:
            print(f"Error parsing goal: {str(e)}")
            return UserGoal()

def run_agent(input_text, action, params):
    agent = GoalSettingAgent()
    response = agent.parse_goal(input_text)
    
    return response

# # Example usage
# def main():
#     agent = GoalSettingAgent()
    
#     # Example with complete information
#     complete_input = """I want to cycle 20.5km three times a week for the next month, 
#     targeting a speed of 25.5kmph. I also want to track my nutrition, 
#     aiming for 2000 calories per day with 150.5g protein."""
    
#     complete_goal = agent.parse_goal(complete_input)
#     print("Complete input result:")
#     print(complete_goal.model_dump_json(indent=2))

#     # # Example with partial information
#     # partial_input = "What should I eat, since I am running 3 times in a week?"
#     # partial_goal = agent.parse_goal(partial_input)
#     # print("\nPartial input result:")
#     # print(partial_goal.model_dump_json(indent=2))

# if __name__ == "__main__":
#     main()