import { UserProgress } from './user-progress';

export class UserProgressTimeline {
    userProgressList: UserProgress[] | undefined;

    constructor(data: any) {
        if (data) {
            this.userProgressList = UserProgress.parseProgressList(data);
        }
    }
}
