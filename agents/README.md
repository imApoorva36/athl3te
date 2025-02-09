# Agents
This folder contains the prompts and the plans for all the agents that have been suggested. As of now, there are four agents:

## Personal Motivator (Free)
- General Quotes & Motivation
- Hooks them to purchase other agents
- Pushing people to achieve their goals
- Tells the person what to do daily, based on their daily plan
- Suggests communities to join

## Community Trends Observer (Free)
* Do we want to have a pro community?
- Clarification on Form and insights (based on community conversations, and people's activity)
- Regularly teaching new things
- Points out and motivates people in the community
- General Quotes and Motivates people
- Talks about role models
- Organizes meets?
- Keeps track of Leaderboard (who's on top and stuff)
- Distributes NFTs at the end of the season
- Showcases a bit about other communities
- Keeps community challenges

## Daily Check-In Agent (Paid)
- Checks in with you daily
- Suggests what exercises you have to do
- Gives form and technique feedback (video analysis?)
- Gives tips on preventing injury

## Personal Trainer (Paid)
### Silver Tier
- Tips on activity & Daily Questioning (basically Daily Check-In Agent)
- Goal Planning and Scheduling

### Gold Tier
- Includes Silver Tier
- Nutrition Recommendation
- Injury Protection and Rehabilitation
- Reviewing Performance, and reflecting on plans

### Platinum Tier
- Includes Gold Tier
- Analyze performance & suggest improvements
- See how professionals train and get advice
- Suggest videos and stuff to watch on the sport



# Workflow

Personal Informatoin + System Prompt(specifying what role the ) + what the user says -> LLM
Base needs Agentkit, so whatever NFT minting and stuff is there, it'll be thru Base and Agentkit, which Autonome's dockerized agent will call
Limited set of activities -> {Walking, Running, Cycling, Swimming}
Goals -> {Calories, Distance, Time, Speed} //Nutrition TBD

# Misc
## Personal Information (Can be stored in Nillion)
- Goals -> 
- Schedule
- Daily Plan for the current day
- List of Injuries
- Nutrition (Dictionary of when to eat, what to eat and how much to eat)
- Progress of the user towards goals (past activities)
- Videos of users doing exercise (not sure if we can do video analysis)
- Communities (which ones they are a part of)
- List of subscribed agents

## Community Information
- Members
- Activity
- Title
- Current ongoing challenge(s)
- Progress of the challenge
- Conversation between people
- Ai agents
- When the AI agents should be called

## Where to use the Graph
- Query over what sort of activites people are doing & update the community page (moving closer towards community goal) in real-time
- Query injuries people are having, and tell the community agent to tell the community (Must be done at regular intervals)
- Display data analytics about a community - where people are from, most fit country and stuff
- Popular agents

# User Experience with Agent

## When the user opens the app for the first time in the day
- Agent asks about injuries and how person is feeling (if none, then skip) -> Automatically log that
- Agent asks about what they have eaten so far -> Automatically log that
- Agent asks about mood and all -> Automatically log that
    - If mood is bad, then motivate, give quote
- Agent reminds users of goals
- Agent tells user about what to do in the current plan (if there are some injuries, it can be just to rest & recommend motivational videos)

## When the user opens the app any other time

### When user is starting an activity
- Normal interface, agent motivates the user (quote/speech)

### When user is in between an activity
- Asks questions about how to do an exercise
- Feedback about form

### When user has completed an activity
- Agent says good job or something
- Agent checks on whether they feel sore
- Agent tells how much closer to goal & how much improvement

### When user wants to discuss about a particular exercise
### When user wants to log what they ate
### When user wants to inform about an injury
### When user wants to ask about a community
### When user wants to ask about planning and goal setting
### When user wants to ask about how professionals train
### When user wants to get links about how others in the world are training

# Community Experience with Agent

## End of old "season" & Start of new "season"
- It will give out NFTs of previous season
- Highlight top performers & upcoming performers

## Throughout the season
- Teach and tell about new things, and trends
- Observe mistakes people are doing, see the good things
- Give general motivation, to reach community goal
- Organize meets?
- Talk about other communities