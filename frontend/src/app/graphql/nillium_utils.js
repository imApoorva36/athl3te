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
      console.error('Error in addMessage:', error);
      return { success: false, error: error.message };
    }
  }

  //add sports goal
  static async addSportsGoal(sportsGoalData) {
    try {
      const response = await fetch('/api/nillion/sport_goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: sportsGoalData }),
      });
      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in addSportsGoal:', error);
      return { success: false, error: error.message };
    }
  }

  //add nutrition goal
  static async addNutritionGoal(nutritionGoalData) {
    try {
      const response = await fetch('/api/nillion/nutrition_goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: nutritionGoalData }),
      });
      if (!response.ok) {
        throw new Error(`Failed to upload: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in addNutritionGoal:', error);
      return { success: false, error: error.message };
    }
  }


  static async getUserMetadata(userId) {
    try {
      const response = await fetch(`/api/nillion/user?filter=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getUserMetadata:', error);
      return { success: false, error: error.message };
    }
  }

  static async getActivity(activityId) {
    try {
      const response = await fetch(`/api/nillion/activity?filter=${encodeURIComponent(JSON.stringify({ activityId }))}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getActivity:', error);
      return { success: false, error: error.message };
    }
  }

  static async getMessagesFromChatId(messageId) {
    try {
      const response = await fetch(`/api/nillion/message?filter=${encodeURIComponent(JSON.stringify({ messageId }))}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getMessagesFromChatId:', error);
      return { success: false, error: error.message };
    }
  }

  static async getSportsGoalDetails(goalId) {
    try {
      const response = await fetch(`/api/nillion/sport_goal?filter=${encodeURIComponent(JSON.stringify({ goalId }))}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getSportsGoalDetails:', error);
      return { success: false, error: error.message };
    }
  }

  static async getNutritionGoalDetails(goalId) {
    try {
      const response = await fetch(`/api/nillion/nutrition_goal?filter=${encodeURIComponent(JSON.stringify({ goalId }))}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getNutritionGoalDetails:', error);
      return { success: false, error: error.message };
    }
  }
}