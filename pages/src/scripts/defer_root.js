const $ = x => document.querySelector(x);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

setInterval(() => {
    const date = new Date();
    $(".time-hours").innerHTML = date.getHours();
    $(".time-minutes").innerHTML = date.getMinutes();
    $(".date-month").innerHTML = date.getMonth();
    $(".date-day").innerHTML = date.getDate();
}, 60);

// WINDOW MANAGEMENT
var windowId = 0;

function launchWindow(width, height, component) {
    $(".active-window") ? $(".active-window").classList.remove("active-window") : '';
    if ($(".visible")) $(".visible").classList.remove("visible");
    const window = httpGet(`${component}?${width}&${height}&win${windowId}`);
    $(".active-workspace").insertAdjacentHTML("beforeend", window);
    makeDraggableAndResizable($(`#win${windowId}`).querySelector(".topbar"));
    windowId++;
}

let mouseIsDown = false;
let mouseWasAt = {x: 0, y:0};
let rightMouse = false;

function makeDraggableAndResizable(titlebar) {
    const win = $(".active-window");
    titlebar.addEventListener("mousedown", e => {
        mouseIsDown = true;
        mouseWasAt.x = e.clientX;
        mouseWasAt.y = e.clientY;
    });
    win.addEventListener("mousedown", e => {
        if (e.metaKey) {
            e.preventDefault();
            if (e.button == 2) {
                rightMouse = true;
            }
            mouseIsDown = true;
            mouseWasAt.x = e.clientX;
            mouseWasAt.y = e.clientY;
        }
    });
    document.addEventListener("mouseup", e => {
        e.preventDefault();
        mouseIsDown = false;
        rightMouse = false;
    });
    document.addEventListener("mousemove", e => {
        if (mouseIsDown) {
            let win = $(".active-window");
            if (rightMouse == false) {
                e.preventDefault();
                win.style.top  = (win.offsetTop + e.clientY - mouseWasAt.y) + "px";
                win.style.left = (win.offsetLeft + e.clientX - mouseWasAt.x) + "px";
                mouseWasAt.x = e.clientX;
                mouseWasAt.y = e.clientY;
            } else if (rightMouse == true) {
                e.preventDefault();
                win.style.height = (Number(win.style.height.replace("px","")) + e.clientY - mouseWasAt.y) + "px";
                win.style.width  = (Number(win.style.width.replace("px","")) + e.clientX - mouseWasAt.x) + "px";
                mouseWasAt.x = e.clientX;
                mouseWasAt.y = e.clientY;
            }
        }
    })
}

document.body.addEventListener("keydown", e => {
    if (e.key == "d" && e.metaKey) {
        $(".rofi").classList.toggle("visible");
        $(".rofi-entry").focus();
    }

    else if (e.key == "Escape") $(".visible") ? $(".visible").classList.remove("visible") : '';

    else if (e.key == "m" && e.metaKey) {
        $(".active-window") ? $(".active-window").classList.toggle("maximized") : '';
    }

    else if ("1234".includes(e.key) && e.metaKey && !e.shiftKey) {
        $(`#workspace-button-${e.key}`).click();
    }

    else if ("1234".includes(e.key) && e.metaKey && e.shiftKey) {
        $(`#workspace-${e.key}`).appendChild($(".active-window"))
    }

    else if (e.key == "c" && e.metaKey && e.shiftKey) {
        $(".active-window") ? $(".active-window").remove() : '';
    }

    else if (e.key == "Enter" && e.metaKey) {
        // Use absolute path, as it is being received by the router
        launchWindow(600, 400, "file_system/bin/apps/terminal.jsx");
    }
})