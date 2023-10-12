let volumeLevel = $("#volume-slider").val()
let screen = $("#screen")
let audio = $(".drum-pad")
let power = true
$(document).ready(function () {
    listening()
    bank()
    screen.text("Welcome")
})
//event listener 
function listening() {
    $(document).on("keydown", handleKeyDown)
    audio.on("click", padClicked)
    $(".select").on("click", flipped)
    $("#volume-slider").on({
        input: adjuster,
        change: () => { screen.text(" ") }
    })
}

//Here will be all the functions
//Function if pads are clicked
function padClicked(e) {
    let padTargeted = e.target
    sound = padTargeted.children[0]
    triggerAudio(sound, padTargeted)
}
//function for any key presses to play audio
function handleKeyDown(e) {
    let padTargeted = $(`[data-key=${e.key.toUpperCase()}]`)
    let sound = padTargeted.find("audio")[0]
    triggerAudio(sound, padTargeted)
}
// function that handles audio triggering
function triggerAudio(sound, padTargeted) {
    if (power) {
        sound.currentTime = 0
        sound.volume = volumeLevel
        sound.play()
        screen.text($(padTargeted).attr("id").replace("-", " "))
    }
    sound.parentElement.classList.toggle("pressed")
    setTimeout(() => {
        sound.parentElement.classList.toggle("pressed")
    }, 50)
}

// function to handle the flipping switches
function flipped(e) {
    // user interface part
    let touched = $(e.currentTarget).children()
    let toggled = $(e.currentTarget).children().hasClass("toggled")
    if (!toggled && power) {
        $(e.currentTarget).children().addClass("toggled")
    } else {
        $(e.currentTarget).children().removeClass("toggled")
    }
    //calling functionality behind toggling the switches
    if ($(e.currentTarget).children().attr("id").includes("power")) {
        ifPowered(touched)
    } else if (power) {
        bank()
    }
}

//Power Switch
function ifPowered(flip) {
    if (flip.hasClass("toggled")) {
        power = false
        screen.text("Goodbye")
        console.log("Going Deaf")
    } else {
        power = true
        screen.text("Welcome Back!")
        console.log("We Back Baby!")
    }
}
// Volume Control let's a go 
function adjuster() {
    volumeLevel = $("#volume-slider").val()
    screen.text(`Volume: ${Math.floor(volumeLevel * 100)}`)
}

//Bank Switch
function bank() {
    let stored
    if (power) {
        if ($("#bankswitch").hasClass("toggled")) {
            stored = chords
            console.log("Bank 2")
            screen.text("Smooth Piano Kit")
        } else {
            stored = heater
            console.log("Bank 1")
            screen.text("Heater Kit")
        }
    }

    for (let i = 0; i < audio.length; i++) {
        audio.eq(i).children().attr("src", stored[i].url)
        audio.eq(i).attr("id", stored[i].id)
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