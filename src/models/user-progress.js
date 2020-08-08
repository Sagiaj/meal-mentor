export class UserProgress {
    constructor(data) {
        if (data) {
            this.weight = data.weight;
            this.age = data.age;
            this.progressId = data.progressId;
        }
    }
    static parseProgressList(progressList) {
        let list = [];
        if (progressList) {
            for (let prog in progressList) {
                list.push(new UserProgress(prog));
            }
        }
        return list;
    }
}
//# sourceMappingURL=user-progress.js.map