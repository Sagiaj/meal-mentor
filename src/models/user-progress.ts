export class UserProgress {
    progressId: number | undefined;
    weight: number | undefined;
    age: number | undefined;

    constructor(data: any) {
        if (data) {
            this.weight = data.weight;
            this.age = data.age;
            this.progressId = data.progressId;
        }
    }

    static parseProgressList(progressList: any): UserProgress[] {
        let list: UserProgress[] = [];
        if (progressList) {
            for (let prog in progressList) {
                list.push(new UserProgress(prog));
            }
        }
        return list;
    }
}