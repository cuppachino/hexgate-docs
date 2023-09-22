import YAML from "yaml";
export class FrontMatter {
    static parse(input) {
        const fm = new FrontMatter(input);
        return fm.read();
    }
    input;
    position;
    constructor(input) {
        this.input = input;
        this.position = 0;
    }
    readUntil(target) {
        const startIndex = this.position;
        const targetIndex = this.input.indexOf(target, this.position);
        if (targetIndex !== -1) {
            this.position = targetIndex + target.length;
            return this.input.slice(startIndex, targetIndex);
        }
        else {
            // If the target is not found, return the remaining input.
            this.position = this.input.length;
            return this.input.slice(startIndex);
        }
    }
    read() {
        // Find the first hr line
        this.readUntil("---");
        // Extract the content between the two hr lines
        const content = this.readUntil("---");
        return {
            content: YAML.parse(content),
            index: this.position,
            body: this.input.slice(this.position, this.input.indexOf("---", this.position)),
        };
    }
}
