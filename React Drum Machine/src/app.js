import React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function drumMachine() {
    const [library, setLibrary] = useState([])
    const [power, setPower] = useState(true)
    const [volume, setVolume] = useState(.5)
    const [display, setDisplay] = useState('Welcome!')
    const buttonRefs = useRef({})

    useEffect(() => {
        setLibrary(heater);
    }, [])

    function powered() {
        setPower(!power)
    }
    useEffect(() => {
        displaying(power ? 'Welcome!' : 'Goodbye!')
    }, [power])

    function displaying(value) {
        setDisplay(value)
    }
    function switchClick() {
        setLibrary(library == heater ? chords : heater)
        displaying(library == heater ? 'Chords Kit' : 'Heater Kit')
    }

    function volumeControl(e) {
        setVolume(e.target.value)
        displaying(`Volume: ${Math.floor(e.target.value * 100)}`)
    }

    function playAudio(key) {
        let selected = library.find(item => item.key == key)
        const audio = buttonRefs.current[key].children[0]

        buttonRefs.current[key].classList.toggle('pressed')
        setTimeout(() => {
            buttonRefs.current[key].classList.toggle('pressed')
        }, 50)

        displaying(selected.id.replace('-', ' '))

        audio.load()
        audio.volume = volume
        audio.play()

    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            library.find(item => item.key == e.key) && power ? playAudio(e.key) : null
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [power, library, volume])

    return (
        <div id='drumMachine' className='container'>
            <TouchPad
                library={library}
                playAudio={playAudio}
                buttonRefs={buttonRefs}
            />
            <Console
                switchClick={switchClick}
                volume={volume}
                volumeControl={volumeControl}
                powerClick={powered}
                power={power}
                display={display}
            />
        </div>
    )
}


function TouchPad({ library, playAudio, buttonRefs }) {
    function RenderButtons() {
        let layout = []
        library.forEach(element => {
            layout.push(<Buttons playAudio={playAudio} key={element.id} info={element} buttonRefs={(ref) => (buttonRefs.current[element.key] = ref)} />)
        })
        return layout
    }

    return (
        <div className='touchPad'>
            {RenderButtons()}
        </div>
    )
}

function Buttons({ info, playAudio, buttonRefs }) {
    const { key, url } = info

    return (
        <div onClick={() => playAudio(key)} ref={buttonRefs} className='drum-pad'>{key.toUpperCase()}
            <audio id={key.toUpperCase()} preload='auto' className="clip" src={url}></audio>
        </div>
    )
}

function Console({ switchClick, volume, volumeControl, powerClick, display, power }) {
    return (
        <div id='console'>

            <div id='controller'>
                <div id='power'>
                    <div id='logo'
                        onClick={powerClick}
                        style={
                            {
                                boxShadow: power ? 'inset 2px 2px 2px 2px black' : '2px 2px 2px 2px black',
                                color: power ? '#970C10' : '#433F30'
                            }
                        }
                    >
                        Fangtasy
                    </div>
                </div>
                <div id='display'>
                    <div id='screen'>{display}</div>
                </div>
                <div id='volume'>
                    <div>Volume</div>
                    <input type="range" min="0" max="1" defaultValue={volume} onChange={(e) => volumeControl(e)} step=".01" id="volume-slider" className='volumeSlider' />
                </div>
                <div id='library'>
                    <div>Sound Bank</div>
                    <Switch click={switchClick} id={'bank'} />
                </div>
            </div>
        </div>
    )
}

function Switch({ click, id }) {
    return (
        <label className='switch'>
            <input id={id} type='checkbox' onClick={click} />
            <span className='switchSlider'></span>
        </label>
    )
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

let chords = [

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