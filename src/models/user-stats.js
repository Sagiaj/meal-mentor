export class UserStats {
    constructor(data) {
        this.age = 0;
        this.weight = 0;
        this.height = 0;
        this.gender = null;
        if (data) {
            this.age = data.age || 0;
            this.weight = data.weight || 0;
            this.gender = data.gender || null;
            this.height = data.height || 0;
        }
    }
}
//# sourceMappingURL=user-stats.js.map