from fastapi import FastAPI
from pydantic import BaseModel
import importlib

app = FastAPI()

# Define request model
class AgentRequest(BaseModel):
    agent_name: str
    action: str
    params: dict
    input_text: str

# Dictionary to map agent names to script modules
AGENTS = {
    "community_bot": "community_bot",
    "goal_setting_bot": "goal_setting_bot",
    "injury_bot" : "injury_bot",
    "nutrition_bot" : "nutrition_bot",
    "personal_bot" : "personal_bot"
}

@app.post("/query")
def query_agent(request: AgentRequest):
    if request.agent_name not in AGENTS:
        return {"error": "Agent not found"}

    # Dynamically import the relevant agent module
    agent_module = importlib.import_module(AGENTS[request.agent_name])
    
    # Assuming each module has a function `run_agent(input_text)`
    response = agent_module.run_agent(request.input_text, request.action, request.params)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
