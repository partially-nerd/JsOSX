const Component = require("../../../framework/component");

class WindowComponent extends Component {
    constructor (width=300, height=200, id="win0", name="Window"){
        super("div");
        this.height = height;
        this.width = width;
        this.name = name;
        this.id = id;
        this.setattr("class", `window active-window acrylic ${this.name}`);
        this.setattr("id", this.id);
        this.mouseEnter = /*js*/ `
            $('.active-window') ? $('.active-window').classList.remove('active-window') : '';
            event.target.classList.add('active-window');
        `
        this.setattr("onmouseenter", `${this.mouseEnter.toString()}`)
        this.setattr("style", `height: ${this.height}px; width: ${this.width}px;`);

        this.boilerplate = /*html*/`
<div class="topbar">
    <div class="topbar-item buttons">
        <button class="topbar-item button close">x</button>
        <button class="topbar-item button minimize">-</button>
        <button class="topbar-item button maximize">+</button>
    </div>
    <div class="topbar-item title">Window: ${this.name}</div>
</div>
<div class="contents">
`;
    }

    asHTML(){
        return `${this.openingtag}>${this.boilerplate}${this.innerhtml}</div></${this.closingtag}`; 
    }
}

module.exports = WindowComponent;