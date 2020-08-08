import { UserProgress } from "./user-progress";
export class UserProgressTimeline {
    constructor(data) {
        if (data) {
            this.userProgressList = UserProgress.parseProgressList(data);
        }
    }
}
//# sourceMappingURL=user-progress-timeline.js.map