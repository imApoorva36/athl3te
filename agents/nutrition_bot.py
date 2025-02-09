from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence
from dotenv import load_dotenv

load_dotenv()

# Import UserGoal model structure from previous code
class BaseGoal(BaseModel):
    frequency: Optional[float] = Field(default=None, description="Frequency of the goal in days")
    duration: Optional[float] = Field(default=None, description="Duration of the goal in days")

class NutritionGoal(BaseGoal):
    protein: Optional[float] = Field(default=None, description="Protein target in grams")
    fats: Optional[float] = Field(default=None, description="Fats target in grams")
    carbs: Optional[float] = Field(default=None, description="Carbohydrates target in grams")
    calories_consumed: Optional[float] = Field(default=None, description="Calories consumption target")
    water_consumed: Optional[float] = Field(default=None, description="Water consumption target in milliliters")

class UserGoal(BaseModel):
    nutrition: Optional[NutritionGoal] = Field(default=None, description="Nutrition goals")

# New models for nutrition logging
class NutritionLog(BaseModel):
    date: datetime
    protein: float = Field(description="Protein consumed in grams")
    fats: float = Field(description="Fats consumed in grams")
    carbs: float = Field(description="Carbohydrates consumed in grams")
    calories_consumed: float = Field(description="Total calories consumed")
    water_consumed: float = Field(description="Water consumed in milliliters")

class NutritionAnalysis(BaseModel):
    average_calories: float
    average_protein: float
    average_carbs: float
    average_fats: float
    average_water: float
    goal_completion_rate: dict
    trend_analysis: str
    recommendations: List[str]

class NutritionBot:
    def __init__(self, model_name="gpt-4o-mini"):
        self.llm = ChatOpenAI(model_name=model_name, temperature=0.7)
        
        self.analysis_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a nutrition specialist analyzing a user's nutrition logs against their goals.
            
            User's Nutrition Goals:
            {goals}
            
            Recent Nutrition Logs:
            {logs}
            
            Analysis Summary:
            {analysis}
            
            Provide detailed feedback considering:
            - Progress towards nutritional goals
            - Macro and micronutrient balance
            - Hydration levels
            - Trends and patterns
            - Areas for improvement
            - Specific recommendations
            
            Be encouraging but honest about areas needing improvement. Give a CONCISE reply, within 50 words!!"""),
            ("human", "{input}")
        ])
        
        self.analysis_chain = self.analysis_prompt | self.llm

    def analyze_logs(self, logs: List[NutritionLog]) -> NutritionAnalysis:
        """Analyze nutrition logs and generate statistical summary"""
        if not logs:
            return None
            
        total_days = len(logs)
        analysis = NutritionAnalysis(
            average_calories = sum(log["calories_consumed"] for log in logs) / total_days,
            average_protein = sum(log["protein"] for log in logs) / total_days,
            average_carbs = sum(log["carbs"] for log in logs) / total_days,
            average_fats = sum(log["fats"] for log in logs) / total_days,
            average_water = sum(log["water_consumed"] for log in logs) / total_days,
            goal_completion_rate={},
            trend_analysis="",
            recommendations=[]
        )
        return analysis

    def calculate_goal_completion(self, goal: NutritionGoal, analysis: NutritionAnalysis) -> dict:
        """Calculate completion rates for each nutrition goal"""
        completion_rates = {}
        
        if goal['calories_consumed']:
            completion_rates['calories'] = (analysis.average_calories / goal['calories_consumed']) * 100
        if goal['protein']:
            completion_rates['protein'] = (analysis.average_protein / goal['protein']) * 100
        if goal['carbs']:
            completion_rates['carbs'] = (analysis.average_carbs / goal['carbs']) * 100
        if goal['fats']:
            completion_rates['fats'] = (analysis.average_fats / goal['fats']) * 100
        if goal['water_consumed']:
            completion_rates['water'] = (analysis.average_water / goal['water_consumed']) * 100
            
        return completion_rates

    def get_feedback(self, user_goal: UserGoal, logs: List[NutritionLog], question: str = "How am I doing with my nutrition?") -> str:
        """Generate personalized feedback based on nutrition logs and goals"""
        try:
            # Analyze logs
            analysis = self.analyze_logs(logs)
            if not analysis:
                return "No nutrition logs available for analysis."

            # Calculate goal completion rates
            if user_goal["nutrition"]:
                analysis.goal_completion_rate = self.calculate_goal_completion(user_goal["nutrition"], analysis)

            # Format goals and logs for the prompt
            goals_str = str(user_goal["nutrition"]) if user_goal["nutrition"] else "No specific goals set"
            # print("1")
            logs_str = "\n".join([str(log) for log in logs])
            # print("2")
            analysis_str = str(analysis)
            # print("13")

            # Generate feedback
            response = self.analysis_chain.invoke({
                "input": question,
                "goals": goals_str,
                "logs": logs_str,
                "analysis": analysis_str
            })
            
            return response.content

        except Exception as e:
            return f"Error generating nutrition feedback: {str(e)}"

def run_agent(input_text, action, params):
    agent = NutritionBot()
    
    user_goal = params["user_goal"]
    logs = params["nutrition_logs"]
    
    # Keep input text None, for general feedback
    response = agent.get_feedback(user_goal, logs, input_text)
    
    return response

# # Example usage
# def main():
#     # Create sample user goal
#     user_goal = UserGoal(
#         nutrition=NutritionGoal(
#             protein=150,
#             carbs=250,
#             fats=70,
#             calories_consumed=2200,
#             water_consumed=3000,
#             frequency=7,
#             duration=30
#         )
#     )
    
#     # Create sample nutrition logs
#     logs = [
#         NutritionLog(
#             date=datetime.now(),
#             protein=130,
#             carbs=220,
#             fats=65,
#             calories_consumed=2000,
#             water_consumed=2500
#         ),
#         NutritionLog(
#             date=datetime.now(),
#             protein=145,
#             carbs=260,
#             fats=75,
#             calories_consumed=2300,
#             water_consumed=2800
#         )
#     ]
    
#     # Initialize nutrition bot
#     bot = NutritionBot()
    
#     # Get nutrition feedback
#     feedback = bot.get_feedback(user_goal, logs)
#     print("\nNutrition Analysis and Recommendations:")
#     print(feedback)

# if __name__ == "__main__":
#     main()