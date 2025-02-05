# Data Models and Data Types

## 1. User Model

| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `isRegistered`        | `boolean`                               | Indicates if the user is registered in the system.                    |
| `age`                 | `uint`                                  | The user’s age (in years).                                             |
| `gender`              | `string`                                | The user’s gender (e.g., "Male", "Female", "Other").                   |
| `name`                | `string`                                | The user’s name.                                                       |
| `weight`              | `uint`                                  | The user’s weight (typically in kilograms).                            |
| `height`              | `uint`                                  | The user’s height (typically in centimeters).                          |
| `activities`          | `array[ActivityModel]`                  | A list of activities the user has performed, each with distance, time, speed, etc. |
| `sportsGoals`         | `array[SportGoal]`                      | A list of sports goals the user is working on.                        |
| `nutritionGoals`      | `array[NutritionGoal]`                  | The user’s nutrition goals.                                           |
| `purchasedBots`       | `array[PersonalAssistantModel]`         | A list of personal assistant bots purchased by the user (e.g., cardio assistants). |
| `injuriesDescription` | `string`                                | A description of any injuries the user has (e.g., type, recovery time). |
| `nfts`                | `array[NFTModel]`                       | A list of NFTs the user has earned as rewards for completing goals.     |

## 2. NFT Model

| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `nftId`              | `string`                                | The unique identifier for the NFT (e.g., token ID, UUID).              |
| `nftName`            | `string`                                | The name of the NFT (e.g., "Fitness Champion Badge").                  |
| `nftImage`           | `string (URI)`                          | URL of the NFT image (could be hosted on IPFS).                        |
| `earnedAt`           | `uint256`                               | The timestamp when the NFT was earned.                                 |
| `description`        | `string`                                | A description of what the NFT represents or the achievement it rewards. |


## 2. Activity Model
| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `distance`            | `uint`                                  | Distance covered in the activity (e.g., in meters or kilometers).      |
| `time`                | `uint`                                  | Time spent on the activity (e.g., in seconds or minutes).              |
| `speed`               | `uint`                                  | Speed during the activity (e.g., in km/h or m/s).                      |
| `calories`            | `uint`                                  | Calories burned during the activity.                                   |
| `cadence`             | `uint`                                  | Cadence (e.g., steps per minute or revolutions per minute).            |
| `activityType`        | `string`                                | Type of activity (e.g., "Run", "Walk", "Cycle", "Swim").               |
| `pr`                  | `string`                                | To store any Personal Record was broken             |

## 3. Sports Goal Model

| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `sportType`          | `string`                                | The type of sport (e.g., "Run", "Swim", "Cycle").                      |
| `intervalDuration`   | `string`                                | Duration for each goal interval (e.g., "1 hour", "30 minutes").        |
| `completedMetrics`   | `array[Sports Metric]`                  | List of completed metrics (e.g., distance, calories).                  |
| `targetMetrics`      | `array[Sports Metric]`                  | List of target metrics (e.g., distance, calories).                     |
| `isGoalActive`       | `boolean`                               | Is the current goal active?                                           |

## 4. Sports Metric Model
| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `distance`            | `uint`                                  | Distance in the metric (e.g., in meters or kilometers).                |
| `calories`            | `uint`                                  | Calories in the metric (e.g., calories burned).                        |

## 5. Nutrition Goal Model
| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `completedMetrics`    | `array[NutritionMetric]`                | List of completed nutrition metrics (e.g., proteins, carbs, hydration).|
| `targetMetrics`       | `array[NutritionMetric]`                | List of target nutrition metrics (e.g., proteins, carbs, hydration).   |
| `intervalDuration`    | `string`                                | Duration for the nutrition goal interval (e.g., "1 week", "1 month").  |
| `isGoalActive`       | `array[Sports Metric]`                         | Is the current goal active?                   |

## 6. Nutrition Metric Model
| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `proteins`            | `uint`                                  | Proteins consumed (e.g., in grams).                                    |
| `carbohydrates`       | `uint`                                  | Carbohydrates consumed (e.g., in grams).                               |
| `fats`                | `uint`                                  | Fats consumed (e.g., in grams).                               |
| `caloriesConsumed`    | `uint`                                  | Total calories consumed.                                               |
| `hydration`           | `uint`                                  | Amount of hydration (e.g., in liters).                                 |

## 7. Bot Model
| Field                | Data Type                               | Description                                                            |
|----------------------|-----------------------------------------|------------------------------------------------------------------------|
| `deploymentURL`       | `string (URI)`                          | URL where the bot is deployed.                                        |
| `systemPrompt`        | `string`                                | System prompt for guiding the bot’s behavior.                          |
| `botName`             | `string`                                | The name of the bot.                                                   |
| `botLogo`             | `string (URI)`                          | URL of the bot's logo (stored in a decentralized location like IPFS). |

## 8. Community Room Model

| Field                               | Data Type                       | Description                                                              |
|-------------------------------------|---------------------------------|--------------------------------------------------------------------------|
| `createdBy`                         | `address`                       | The address of the creator of the community.                             |
| `members`                           | `mapping(address => boolean)`   | Mapping of community members (Ethereum address) and their membership status. |
| `membersWithPersonalAssistants`     | `mapping(address => boolean)`   | Mapping of members with unlocked personal assistants.                    |
| `costToUnlockPersonalAssistantGW`   | `uint256`                       | The cost to unlock the personal assistant for a member in GigaWei.                  |
| `messages`                          | `array[Message]`                | Array of messages in the community, including both bot and user messages. |
| `communityName`                     | `string`                        | Name of the community.                                                  |
| `communityLogo`                     | `string (URI)`                  | Logo of the community stored in a decentralized location (e.g., IPFS).  |
| `bot`                               | `Bot Model`                  | Bot which is present in the community  |


## 9. Message Model

| Field        | Data Type             | Description                                                   |
|--------------|-----------------------|---------------------------------------------------------------|
| `text`       | `string`              | Content of the message.                                       |
| `sender`     | `address`             | Ethereum address of the message sender.                       |
| `ipfsImageUrl`| `string (IPFS CID)`   | Optional image attached to the message (stored on IPFS).      |
| `timestamp`  | `uint256`             | Timestamp of when the message was sent.                       |
| `sentByBot`  | `boolean`             | Flag to indicate if the message was sent by the bot.          |


## 10. Personal Assistant Model

| Field        | Data Type             | Description                                                     |
| `bot`        | `Bot Model`           | Bot to talk to                                                  |
| `messages`   | `array[Message]`      | Array of messages in the community, including both bot and user |