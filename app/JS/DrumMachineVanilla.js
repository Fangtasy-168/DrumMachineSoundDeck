//Loading page start off
let display = document.querySelector("#screen")
document.addEventListener("DOMContentLoaded", function () {
    ifPowered()
    whichBank()
    display.innerHTML = "Welcome!"
    clearDisplay()
})

//Pad usuage 
function active() {
    const drumpad = document.querySelectorAll(".drum-pad")
    drumpad.forEach((pad) => {
        pad.addEventListener("click", handleClick)
    })
    document.addEventListener("keydown", handleKeyDown)
    volume.addEventListener("input", adjuster)
    volume.addEventListener("change", clearDisplay)
}
function handleClick(e) {
    let parent = e.target
    audio = parent.children[0]
    triggerAudio(audio)
}

function handleKeyDown(e) {
    let parent = document.querySelector(`[data-key = "${e.key.toUpperCase()}"]`)
    let audio = parent.children[0]
    console.log(audio)
    if (audio) {
        triggerAudio(audio);
    }
}

function triggerAudio(audio) {
    audio.parentElement.classList.toggle("pressed")
    audio.currentTime = 0
    audio.volume = volumeLevel
    audio.play()
    display.innerHTML = audio.parentElement.getAttribute("id").replaceAll("-", " ")
    setTimeout(() => {
        audio.parentElement.classList.toggle("pressed")
    }, 50)
}

// Power Button & Sound Bank selector
let flip = document.querySelectorAll(".select")
flip.forEach((click) => {
    click.addEventListener("click", toggle)
})

function toggle(e) {
    let click = e.currentTarget
    click.children[0].classList.toggle("toggled")
    if (click.children[0].getAttribute("id") == "powerswitch") {
        ifPowered()
    } else {
        whichBank()
    }
}

//Power functionality
function ifPowered() {
    let power = document.querySelector("#powerswitch")
    const drumpad = document.querySelectorAll(".drum-pad")
    console.log(power.classList.contains("toggled"))
    if (!power.classList.contains("toggled")) {
        active()
        adjuster()
        display.innerHTML = "Welcome Back!"
        clearDisplay()
        console.log("Power On")

    } else {
        drumpad.forEach((pad) => {
            pad.removeEventListener("click", handleClick)
        })
        document.removeEventListener("keydown", handleKeyDown)
        volume.removeEventListener("input", adjuster)
        volume.removeEventListener("change", clearDisplay)
        console.log("Power Off")
        display.innerHTML = ""
    }
}
//Volume Control
let volume = document.querySelector("#volume-slider")
let volumeLevel = volume.value

function adjuster() {
    volumeLevel = volume.value
    volume.setAttribute("value", volumeLevel)
    display.innerHTML = "Volume: " + Math.round(volumeLevel * 100)
}
function clearDisplay() {
    setTimeout(() => {
        display.innerHTML = " "
    }, 1000)
}



//Bank Functionality
function whichBank() {
    let audio = document.querySelectorAll(".drum-pad")
    let stored = document.querySelector("#bankswitch").classList.contains("toggled") ? chords : heater
    if (stored == chords) {
        display.innerHTML = "Smooth Piano Kit"
    } else {
        display.innerHTML = "Heater Kit"
    }
    console.log(audio[0].children)
    for (let i = 0; i < audio.length; i++) {
        audio[i].children[0].setAttribute("src", stored[i].url)
        audio[i].setAttribute("id", stored[i].id)
        console.log("changed")
    }


}

let heater = [
    {
        key: "q",
        id: "Heater-1",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
        key: "w",
        id: "Heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
        key: "e",
        id: "Heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
        key: "a",
        id: "Heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
        key: "s",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
        key: "d",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
        key: "z",
        id: "Kick-n'-Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
        key: "x",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
        key: "c",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }]
    ,
    chords = [

        {
            key: "q",
            id: "Chord-1",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        },
        {
            key: "w",
            id: "Chord-2",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
        },
        {
            key: "e",
            id: "Chord-3",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
        },
        {
            key: "a",
            id: "Shaker",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        },
        {
            key: "s",
            id: "Open-HH",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
        },
        {
            key: "d",
            id: "Closed-HH",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
        },
        {
            key: "z",
            id: "Punchy-Kick",
            url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
        },
        {
            key: "x",
            id: "Side-Stick",
            url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
        },
        {
            key: "c",
            id: "Snare",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
        }
    ]




