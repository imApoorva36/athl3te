from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence
from dotenv import load_dotenv

load_dotenv()

class CommunityMember(BaseModel):
    name: str
    achievements: List[str]
    activity_stats: dict
    join_date: datetime

class Community(BaseModel):
    name: str
    activity_type: str
    common_injuries: List[str]
    member_count: int
    top_performers: List[CommunityMember]

class CommunityBot:
    def __init__(self, model_name="gpt-4o-mini"):
        self.llm = ChatOpenAI(model_name=model_name, temperature=0.7)
        self.quotes = self._load_motivational_quotes()
        self.activity_tips = self._load_activity_tips()
        
        self._setup_prompts()
        self._setup_chains()

    def _load_motivational_quotes(self):
        return [
            "Success is not final, failure is not fatal",
            "The only bad workout is the one that didn't happen",
            "Your body can stand almost anything. It's your mind you have to convince"
        ]

    def _load_activity_tips(self):
        return {
            "running": ["Maintain proper form", "Start slow", "Stay hydrated"],
            "cycling": ["Check tire pressure", "Maintain cadence", "Position check"],
            "swimming": ["Breathe rhythm", "Streamline position", "Regular breaks"]
        }

    def _setup_prompts(self):
        self.injury_prompt = ChatPromptTemplate.from_messages([
            ("system", """You're a community health advisor.
            Common injuries in {activity_type}: {injuries}
            Provide prevention and recovery advice."""),
            ("human", "{input}")
        ])

        self.performer_prompt = ChatPromptTemplate.from_messages([
            ("system", """Highlight top performers in {activity_type} community.
            Performers: {performers}
            Create engaging highlights of their achievements."""),
            ("human", "Who are our top performers?")
        ])

    def _setup_chains(self):
        self.injury_chain = self.injury_prompt | self.llm
        self.performer_chain = self.performer_prompt | self.llm

    async def mint_nft(self, member: CommunityMember, achievement: str):
        """Placeholder for NFT minting functionality"""
        return f"NFT minted for {member.name}: {achievement}"

    def get_injury_advice(self, community: Community) -> str:
        try:
            return self.injury_chain.invoke({
                "activity_type": community.activity_type,
                "injuries": ", ".join(community.common_injuries),
                "input": "What should we know about common injuries?"
            }).content
        except Exception as e:
            return f"Error getting injury advice: {str(e)}"

    def get_motivational_quote(self) -> str:
        return self.quotes[0]  # In practice, would randomly select

    def get_activity_tips(self, activity_type: str) -> List[str]:
        return self.activity_tips.get(activity_type, ["No specific tips available"])

    def highlight_performers(self, community: Community) -> str:
        try:
            performers_info = [member.model_dump() for member in community.top_performers]
            return self.performer_chain.invoke({
                "activity_type": community.activity_type,
                "performers": performers_info
            }).content
        except Exception as e:
            return f"Error highlighting performers: {str(e)}"

def run_agent(input_text, action, params):
    agent = CommunityBot()
    
    community = Community(
        name=params['name'],
        activity_type=params['activity_type'],
        common_injuries=params['injuries'],
        member_count=params['member_count'],
        top_performers=params['top_performers']
    )
    
    if action == 'injury_advice':
        response = agent.get_injury_advice(community)
    elif action == 'motivation':
        response = agent.get_motivational_quote()
    elif action == 'tips':
        response = agent.get_activity_tips(community.activity_type)
    elif action == 'highlight_performers':
        response = agent.highlight_performers(community)
    elif action == 'end_season':
        #Mint NFT using CDP SDK
        pass
    
    return response

# def main():
#     # Example usage
#     community = Community(
#         name="RunnersPro",
#         activity_type="running",
#         common_injuries=["runner's knee", "shin splints"],
#         member_count=1000,
#         top_performers=[
#             CommunityMember(
#                 name="John Doe",
#                 achievements=["Marathon PB: 2:45", "Weekly distance: 80km"],
#                 activity_stats={"avg_pace": "4:30/km"},
#                 join_date=datetime.now()
#             )
#         ]
#     )

#     bot = CommunityBot()
    
#     print(bot.get_injury_advice(community))
#     print('---------------------------------------------------------------------------')
#     print(bot.get_motivational_quote())
#     print('---------------------------------------------------------------------------')
#     print(bot.get_activity_tips(community.activity_type))
#     print('---------------------------------------------------------------------------')
#     print(bot.highlight_performers(community))

# if __name__ == "__main__":
#     main()