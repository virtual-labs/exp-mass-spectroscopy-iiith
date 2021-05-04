"use strict";
const messagearr = [
    "Click on the sample to transfer the small amount(2-5mg) of the sampe into the empty sample bottle",
    "Click on the solvent bottle to transfer 2 to 3 ml of the solvent(methylene chloride) to the sample to prepare a clear solution",
    "Click on the dessicator to take out the 'solution JR cell",
    "Click on the sample solution to draw 1ml of the solution with a syringe",
    "Click on the JR cell to transfer the sample solution until all the air is expelled from the solution cell",
    "Click on the solution JR cell to place the cell inside the spectrometer ",
    "Click the JR discs to move the JR plates to the plate holder",
    "Click on the holder to place the sample in the spectrometer..",
    "Click start to run the spectrometer"
]
// flags
let sample_selected = -1
let sample_collect_flag = 0
let solvent_collect_flag = 0
let desiccator_flag = 0
let fill_dropper_flag = 0
let empty_dropper_flag = 0
let prepration_stage_flag = 0

function sampleselect(c) {
    // const c = event.target.id;
    const a1 = anime.timeline({
        targets: document.getElementById('button1'),
        duration: 200,
        easing: 'linear',
    });
    const a2 = anime.timeline({
        targets: document.getElementById('button2'),
        duration: 200,
        easing: 'linear',
    });
    if(c=='1')
    {
        sample_selected = 1;
    }
    else if(c=='2')
    {
        sample_selected = 2;
    }
    a1.add({
        opacity: 0,
        zIndex: 0,
    });
    a2.add({
        opacity: 0,
        zIndex: 0,
    }).add({
        update: function(anim) {
            document.getElementById("message").innerHTML = messagearr[0];
        }
    });

    const a3 = anime.timeline({
        targets: document.getElementById('layer0'),
        duration: 200,
        easing: 'linear',
    }).add({
        opacity: 0,
    });
    const a4 = anime.timeline({
        targets: document.getElementById('layer1'),
        duration: 200,
        easing: 'linear',
    }).add({
        opacity: 1,
    });
}
function addsample() {
    if(sample_selected != -1)
    {
        let a1 = anime.timeline({
            targets: document.getElementById('solution1'),
            duration: 1200,
            easing: 'linear',
        });

        a1.add({
            opacity: 1,
            // top: '13.4rem',
            // height: '2rem',
        }).add({
            update: function(anim) {
                document.getElementById("message").innerHTML = messagearr[1];
                
                
            }
        });
        sample_collect_flag = 1;
    }
}

function addsolvent() {
    if(sample_collect_flag)
    {
            let a1 = anime.timeline({
            targets: document.getElementById('solution2'),
            duration: 1200,
            easing: 'linear',
        });

        a1.add({
            opacity: 1,
            // top: '9.4rem',
            // height: '6.0rem',
        }).add({
            update: function(anim) {
                document.getElementById("message").innerHTML = messagearr[2];
                
                
            }
        });
        solvent_collect_flag = 1;
    }
}

function addjrcell() {
    if(solvent_collect_flag)
    {
        let a1 =anime.timeline({
            targets: document.getElementById('jrcell'),
            duration: 1200,
            easing: 'linear'
        });

        a1.add({
            opacity: 1,
        }).add({
            update: function(anim) {
                document.getElementById("message").innerHTML = messagearr[3];
                
                
            }
        });
        desiccator_flag = 1;   
    }
}

function filldropper1() {
    if(desiccator_flag)
    {
        let a1 =anime.timeline({
            targets: document.getElementById('dropper1'),
            duration: 300,
            easing: 'linear'
        });
        let a2 =anime.timeline({
            targets: document.getElementById('sol1'),
            delay:300,
            duration: 900,
            easing: 'linear'
        });
        a1.add({
            opacity: 1,
        });
        a2.add({
            opacity: 1,
        });
        let a3 =anime.timeline({
            targets: document.getElementById('collectedsol1'),
            delay:2500,
            duration: 1200,
            easing: 'linear'
        });
        a3.add({
            opacity: 0,
        }).add({
            update: function(anim) {
                document.getElementById("message").innerHTML = messagearr[4];    
            }
        });
        fill_dropper_flag = 1;
    }
}

function emptydropper2() {
    if(prepration_stage_flag)
    {
        let a1 =anime.timeline({
            targets: document.getElementById('layer1'),
            duration: 300,
            easing: 'linear'
        }); 
        a1.add({
            opacity: 0,
        })  
    }
    if(fill_dropper_flag && prepration_stage_flag!=1)
    {
        let a1 =anime.timeline({
            targets: document.getElementById('dropper2'),
            duration: 300,
            easing: 'linear'
        });
        let a2 =anime.timeline({
            targets: document.getElementById('sol2'),
            delay:100,
            duration: 600,
            easing: 'linear'
        });
        let a3 =anime.timeline({
            targets: document.getElementById('slit'),
            delay:600,
            duration: 900,
            easing: 'linear'
        });
        a1.add({
            opacity: 1,
        });
        a2.add({
            opacity: 1,
        }).add({
            opacity: 0,
        });
        a3.add({
            opacity: 1,
        }).add({
            update: function(anim) {
                document.getElementById("message").innerHTML = messagearr[5];   
            }
        });
        empty_dropper_flag = 1;
        prepration_stage_flag = 1;
    }  
}

let clickFlag = 0;
let startAnimFlag = 1;
let graphFlag = 0;

