import { uploadToNillion as activityPost, fetchFromNillion as activityFetch } from "../../../nillion/utils/activity";
import { uploadToNillion as messagePost, fetchFromNillion as messageFetch } from "../../../nillion/utils/message";
import { uploadToNillion as nutriMatricPost, fetchFromNillion as nutriMatricFetch } from "../../../nillion/utils/nutrition_metric";
import { uploadToNillion as nutriGoalPost, fetchFromNillion as nutriGoalFetch } from "../../../nillion/utils/nutritional_goal";
import { uploadToNillion as sportGoalPost, fetchFromNillion as sportGoalFetch } from "../../../nillion/utils/sport_goal";
import { uploadToNillion as sportMetricPost, fetchFromNillion as sportMetricFetch } from "../../../nillion/utils/sport_metric";
import { uploadToNillion as userPost, fetchFromNillion as userFetch } from "../../../nillion/utils/user";

export class NilliumUtils {

  static async addUserMetadata(userMetadata) {
    console.log(userMetadata);
    return userPost(userMetadata);
  }

  static async addActivity(activityData) {
    return activityPost(activityData);
  }

  static async addMessage(messageData) {
    return messagePost(messageData);
  }

  //add sports goal
  static async addSportsGoal(sportsGoalData) {
    return sportGoalPost(sportsGoalData);
  }

  //add nutrition goal
  static async addNutritionGoal(sportsGoalData) {
    return nutriGoalPost(sportsGoalData);
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
    return userFetch(userId);
  }

  static async getActivity(activityId) {
    return activityFetch(activityId);
  }

  static async getMessage(messageId) {
    return messageFetch(messageId);
  }
}