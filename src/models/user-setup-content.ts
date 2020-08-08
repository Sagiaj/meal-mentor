import { UserStats } from './user-stats';
import { UserGoal, UserActivityLevel } from './enums';
import { UserSetupForm } from '@/store/modules/data-types';

export class UserSetupContent {
    public userStats: UserStats | undefined;
    public userGoal: UserGoal | undefined;
    public userActivityLevel: UserActivityLevel | undefined;

    constructor(data?: any) {
        if (data) {
            this.userActivityLevel = data.userActivityLevel
            this.userGoal = data.userGoal;
            this.userStats = new UserStats(data.userStats);
        }
    }

    static createFromSetupForm(content: UserSetupForm): UserSetupContent {
        const userContent = new UserSetupContent({});
        if (content) {
            userContent.userStats = new UserStats(content.stats);
            userContent.userGoal = content.goal;
            userContent.userActivityLevel = content.activityLevel;
        }
        return userContent;
    }
};
