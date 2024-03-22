module.exports = class Component{
    constructor(element) {
        this.element = element;
        this.openingtag = `<${this.element}`;
        this.innerhtml = "";
        this.closingtag = `</${this.element}>`;
    }
    append(element) {
        if (element instanceof Component) this.innerhtml += Component.asHTML();
        else this.innerhtml += element;
    }
    setattr(key, val) {
        this.openingtag += ` ${key}="${val}"`;
    }
    asHTML() {
        return `${this.openingtag}>${this.innerhtml}${this.closingtag}`;
    }
}