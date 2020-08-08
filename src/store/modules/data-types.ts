import { UserStats } from '@/models/user-stats';
import { UserGoal, UserActivityLevel } from '@/models/enums';

export type UserSetupForm = {
    stats: UserStats;
    goal: UserGoal;
    activityLevel: UserActivityLevel;
};
