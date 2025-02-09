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

  // static async addCommunityGoalDetails(communityName, goalId) {
  //   // Implement the logic to add community goal details on Nillium
  //   // Example: await fetch('https://nillium-api.com/add', { method: 'POST', body: JSON.stringify({ communityName, goalId }) });
  // }

  static async getUserMetadata(userId) {
    // return userFetch(userId);
  }

  static async getActivity(activityId) {
    // return activityFetch(activityId);
  }

  static async getMessagesFromChatId(messageId) {
    // return messageFetch(messageId);
  }

  static async getActivityDetails(activityId) {}

  static async getSportsGoalDetails(goalId) {}
  
  static async getNutritionGoalDetails(goalId) {}
  static async getUserProfile(goalId) {}
}