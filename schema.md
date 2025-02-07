# Data Models and Data Types

## 1. User Model - Nillion + UUID on contract

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| isRegistered | boolean | Indicates if the user is registered in the system | String |
| age | uint | The user's age (in years) | Encrypted |
| gender | string | The user's gender (e.g., "Male", "Female", "Other") | Encrypted |
| name | string | The user's name | Encrypted |
| weight | uint | The user's weight (typically in kilograms) | Encrypted |
| height | uint | The user's height (typically in centimeters) | Encrypted |
| activities | array[ActivityModel] | A list of activities the user has performed | Encrypted |
| sportsGoals | array[SportGoal] | A list of sports goals the user is working on | Encrypted |
| nutritionGoals | array[NutritionGoal] | The user's nutrition goals | Encrypted |
| purchasedBots | array[PersonalAssistantModel] | A list of personal assistant bots purchased by the user | String |
| injuriesDescription | string | A description of any injuries the user has | Encrypted |
| nfts | array[NFTModel] | A list of NFTs earned as rewards for completing goals | String |

## 2. NFT Model - Contract Only

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| nftId | string | The unique identifier for the NFT | Contract |
| nftName | string | The name of the NFT | Contract |
| nftImage | string (URI) | URL of the NFT image | Contract |
| earnedAt | uint256 | The timestamp when the NFT was earned | Contract |
| description | string | A description of what the NFT represents | Contract |

## 3. Activity Model - Nillion + UUID on contract

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| distance | uint | Distance covered in the activity | Encrypted |
| time | uint | Time spent on the activity | Encrypted |
| speed | uint | Speed during the activity | Encrypted |
| calories | uint | Calories burned during the activity | Encrypted |
| cadence | uint | Cadence (e.g., steps per minute) | Encrypted |
| activityType | string | Type of activity (e.g., "Run", "Walk", "Cycle", "Swim") | Encrypted |
| pr | string | To store any Personal Record was broken | Encrypted |

## 4. Sports Goal Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| sportType | string | The type of sport | Contract |
| intervalDuration | string | Duration for each goal interval | Encrypted |
| completedMetrics | array[Sports Metric] | List of completed metrics | Encrypted |
| targetMetrics | array[Sports Metric] | List of target metrics | Encrypted |
| isGoalActive | boolean | Is the current goal active? | Contract |
| goalDayWisePlan | array[string] | Daywise plan/description on how/what to complete | Encrypted |

## 5. Sports Metric Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| distance | uint | Distance in the metric | Encrypted |
| calories | uint | Calories in the metric | Encrypted |

## 6. Nutrition Goal Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| completedMetrics | array[NutritionMetric] | List of completed nutrition metrics | Encrypted |
| targetMetrics | array[NutritionMetric] | List of target nutrition metrics | Encrypted |
| intervalDuration | string | Duration for the nutrition goal interval | Encrypted |
| isGoalActive | array[Sports Metric] | Is the current goal active? | String |
| goalDayWisePlan | array[string] | Daywise plan/description on how/what to complete | Encrypted |

## 7. Nutrition Metric Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| proteins | uint | Proteins consumed (in grams) | Encrypted |
| carbohydrates | uint | Carbohydrates consumed (in grams) | Encrypted |
| fats | uint | Fats consumed (in grams) | Encrypted |
| caloriesConsumed | uint | Total calories consumed | Encrypted |
| hydration | uint | Amount of hydration (in liters) | Encrypted |

## 8. Bot Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| deploymentURL | string (URI) | URL where the bot is deployed | Contract |
| description | string | Description of the Bot | Contract |
| systemPrompt | string | System prompt for guiding the bot's behavior | Contract |
| botName | string | The name of the bot | Contract |
| botLogo | string (URI) | URL of the bot's logo | Contract |

## 9. Community Room Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| createdBy | address | The address of the creator of the community | Contract |
| members | mapping(address => boolean) | Mapping of community members and their membership status | Contract |
| membersWithPersonalAssistants | mapping(address => boolean) | Mapping of members with unlocked personal assistants | Contract |
| costToUnlockPersonalAssistantGW | uint256 | Cost to unlock the personal assistant (in GigaWei) | Contract |
| messages | array[Message] | Array of messages in the community | Encrypted(UUID) |
| communityName | string | Name of the community | Contract |
| communityLogo | string (URI) | Logo of the community | Contract |
| bot | Bot Model | Bot which is present in the community | Contract |
| sportsGoals | array[SportGoal] | List of sports goals the community is working on | Encrypted |

## 10. Message Model - Contract + UUID

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| text | string | Content of the message | Encrypted UUID |
| sender | address | Ethereum address of the message sender | Contract |
| ipfsImageUrl | string (IPFS CID) | Optional image attached to the message | Contract |
| timestamp | uint256 | Timestamp when the message was sent | Contract |
| sentByBot | boolean | Flag to indicate if the message was sent by the bot | Contract |

## 11. Personal Assistant Model

| Field | Type | Description | Storage |
| --- | --- | --- | --- |
| bot | Bot Model | Bot to talk to | Contract |
| messages | array[Message] | Array of messages in the community | Encrypted |