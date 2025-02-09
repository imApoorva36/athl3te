export class NilliumUtils {

  static async addUserMetadata(userMetadata) {
    try {
      const response = await fetch('/api/nillion/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: userMetadata }),
      });
      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in addUserMetadata:', error);
      return { success: false, error: error.message };
    }
  }

  static async addActivity(activityData) {
    try {
      const response = await fetch('/api/nillion/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: activityData }),
      });
      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in addActivity:', error);
      return { success: false, error: error.message };
    }
  }

  static async addMessage(messageData) {
    try {
      const response = await fetch('/api/nillion/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: messageData }),
      });
      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in addActivity:', error);
      return { success: false, error: error.message };
    }
  }

  //add sports goal
  static async addSportsGoal(sportsGoalData) {
    // return sportGoalPost(sportsGoalData);
  }

  //add nutrition goal
  static async addNutritionGoal(sportsGoalData) {
    // return nutriGoalPost(sportsGoalData);
  }

  static async addCommunityGoalDetails(communityName, goalId) {
    // Implement the logic to add community goal details on Nillium
    // Example: await fetch('https://nillium-api.com/add', { method: 'POST', body: JSON.stringify({ communityName, goalId }) });
  }

  static async addBotPurchaseDetails(botName, account) {
    // Implement the logic to add bot purchase details on Nillium
    // Example: await fetch('https://nillium-api.com/add', { method: 'POST', body: JSON.stringify({ botName, account }) });
  }

  static async addInjuryUpdateDetails(injuryId) {
    // Implement the logic to add injury update details on Nillium
    // Example: await fetch('https://nillium-api.com/add', { method: 'POST', body: JSON.stringify({ injuryId }) });
  }

  static async addCommunityRoomDetails(communityName, botName) {
    // Implement the logic to add community room creation details on Nillium
    // Example: await fetch('https://nillium-api.com/add', { method: 'POST', body: JSON.stringify({ communityName, botName }) });
  }

  static async addCommunityRoomJoinDetails(communityName, account) {
    // Implement the logic to add community room join details on Nillium
    // Example: await fetch('https://nillium-api.com/add', { method: 'POST', body: JSON.stringify({ communityName, account }) });
  }

  static async getUserMetadata(userId) {
    // return userFetch(userId);
  }

  static async getActivity(activityId) {
    // return activityFetch(activityId);
  }

  static async getMessage(messageId) {
    // return messageFetch(messageId);
  }
}