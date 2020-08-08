import { Gender } from './enums';

export class UserStats {
    public age: number = 0;
    public weight: number = 0;
    public height: number = 0;
    public gender: Gender | null = null;

    constructor(data?: any) {
        if (data) {
            this.age = data.age || 0;
            this.weight = data.weight || 0;
            this.gender = data.gender || null;
            this.height = data.height || 0;
        }
    }
}