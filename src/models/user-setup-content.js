import { UserStats } from "./user-stats";
export class UserSetupContent {
    constructor(data) {
        if (data) {
            this.userActivityLevel = data.userActivityLevel;
            this.userGoal = data.userGoal;
            this.userStats = new UserStats(data.userStats);
        }
    }
    static createFromSetupForm(content) {
        const userContent = new UserSetupContent({});
        if (content) {
            userContent.userStats = new UserStats(content.stats);
            userContent.userGoal = content.goal;
            userContent.userActivityLevel = content.activityLevel;
        }
        return userContent;
    }
    static parseListFromDB(list) {
        const setupContents = [];
        if (list && list.length) {
            for (const item of list) {
                setupContents.push(new UserSetupContent(item));
            }
        }
        return setupContents;
    }
}
//# sourceMappingURL=user-setup-content.js.map