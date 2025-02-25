import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as Tone from "tone";

//CANVAS
const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();

//SIZES==========================================================================================================
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// COLOR PALETTE==========================================================================================================  
const taliesenRed = new THREE.Color(0xC89640);  
const oscillatorOneColor = new THREE.Color(0xff8800); 
const tunnelColor = new THREE.Color(0x008285);

const neutraColorPalette = {
    neutraBeige: "#D9D4C5",
    sageGreen: "#A8B79A",
    warmGray: "#A9A39B",
    terracotta: "#C67650",
    paleSkyBlue: "#9EB8C2",
    oliveBrown: "#5A5A44",
    sunlitSand: "#E5C69F",
    mutedTeal: "#6E8D90",
    charcoalGray: "#4A4A4A"
};

const labelMaterial = new THREE.MeshStandardMaterial({
    color: oscillatorOneColor, 
    opacity: 0.0,   
    transparent: true,
    roughness: 0.5,  
    metalness: 0.1  
});


//Avatar Keys
const ringMaterialA = new THREE.MeshToonMaterial({
    color: tunnelColor,
    emissive: 0x44ff44, 
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});

const ringMaterialB = new THREE.MeshToonMaterial({
    color: tunnelColor,
    emissive: 0x44ff44, 
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});

const ringMaterialC = new THREE.MeshToonMaterial({
    color: tunnelColor,
    emissive: 0x44ff44, 
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});

const ringMaterialD = new THREE.MeshToonMaterial({
    color: tunnelColor,
    emissive: 0x44ff44, 
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});

const ringMaterialE = new THREE.MeshToonMaterial({
    color: tunnelColor,
    emissive: 0x44ff44, 
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
});

const ringGroup = new THREE.Group();
scene.add(ringGroup);

// Function to create rings
function createRing(xPosition, yPosition, label) {
    const ringGeometry = new THREE.CircleGeometry(0.5, 32);
    const ring = new THREE.Mesh(ringGeometry, ringMaterialA);
    ring.position.set(xPosition, yPosition, -2);
    ring.scale.set(0.2, 0.2, 0.2);
    ringGroup.add(ring);
}

// Create 5 see-through rings with labels
const labels = ['Root', 'Maj 3rd', 'Maj 4th', 'Maj 5th', 'Maj 7th'];
const bottomRowY = -1.25;
const topRowY = -1.05;
const startX = -0.26;
const textSpacing = 0.24;

// Bottom row (3 rings)
for (let i = 0; i < 3; i++) {
    createRing(startX + i * textSpacing, bottomRowY, labels[i]);
}

// Top row (2 rings)
for (let i = 3; i < 5; i++) {
    createRing(startX + (i - 3) * textSpacing + 0.13, topRowY, labels[i]);
}

const rootRing = ringGroup.children[0];
rootRing.material = ringMaterialA;
const thirdRing = ringGroup.children[3];
thirdRing.material = ringMaterialB;
const fourthRing = ringGroup.children[1];
fourthRing.material = ringMaterialC;
const fifthRing = ringGroup.children[4];
fifthRing.material = ringMaterialD;
const seventhRing = ringGroup.children[2];
seventhRing.material = ringMaterialE;

const rings = [rootRing, thirdRing, fourthRing, fifthRing, seventhRing];

//SYNTH========================================
const synth = new Tone.MonoSynth({
    oscillator: {
        type: "sawtooth" // or "sine", "square", "triangle"
    },
    filter: {
        type: "lowpass",
        frequency: 2000,
        rolloff: -12,
        Q: 1
    },
    filterEnvelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 1,
        baseFrequency: 200,
        octaves: 3
    },
    envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.9,
        release: 0.5
    }
}).toDestination();

const noise = new Tone.NoiseSynth().toDestination();
// noise.connect(synth.filter);


synth.volume.value = Tone.gainToDb(0.0);

synth.oscillator.type = "sine";
synth.envelope.attack = 0.05;
synth.envelope.release = 0.2;

window.addEventListener('click', () => {
    Tone.start();
    console.log('Audio Context Started');
});

//Click Logic For Keyboard
let isHoldingRootRing = false;
let isHoldingThirdRing = false;
let isHoldingFourth = false;
let isHoldingFifth = false;
let isHoldingSeventh = false;

window.addEventListener('mousedown', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(rings);

  if (intersects.length > 0) {

    const clickedRing = intersects[0].object;

    if (clickedRing === rootRing) {
    isHoldingRootRing = true;
    synth.triggerAttack("D3");
    noise.triggerAttack();
    rootRing.material.color.set(neutraColorPalette.paleSkyBlue);
    rootRing.material.opacity = 0.9;
    }

    else if (clickedRing === thirdRing) {
    isHoldingThirdRing = true;
    synth.triggerAttack("F#3");
    noise.triggerAttack();
    thirdRing.material.color.set(neutraColorPalette.paleSkyBlue);
    thirdRing.material.opacity = 0.9;
    }

    else if (clickedRing === fourthRing) {
    isHoldingFourth = true;
    synth.triggerAttack("G3");
    noise.triggerAttack();
    fourthRing.material.color.set(neutraColorPalette.paleSkyBlue);
    fourthRing.material.opacity = 0.9;
    }

    else if (clickedRing === fifthRing) {
    isHoldingFifth = true;
    synth.triggerAttack("A3");
    noise.triggerAttack();
    fifthRing.material.color.set(neutraColorPalette.paleSkyBlue);
    fifthRing.material.opacity = 0.9;
    }

    else if (clickedRing === seventhRing) {
    isHoldingSeventh = true;
    synth.triggerAttack("C4");
    noise.triggerAttack();
    seventhRing.material.color.set(neutraColorPalette.paleSkyBlue);
    seventhRing.material.opacity = 0.9;
    }
  }
});

window.addEventListener('mouseup', (event) => {
  if (isHoldingRootRing) {
    synth.triggerRelease();
    noise.triggerRelease();
    rootRing.material.color.set(tunnelColor);
    rootRing.material.opacity = 0.25;
    isHoldingRootRing = false;
  }

  else if (isHoldingThirdRing) {
    synth.triggerRelease();
    noise.triggerRelease();
    thirdRing.material.color.set(tunnelColor);
    thirdRing.material.opacity = 0.25;
    isHoldingThirdRing = false;
  }

  else if (isHoldingFourth) {
    synth.triggerRelease();
    noise.triggerRelease();
    fourthRing.material.color.set(tunnelColor);
    fourthRing.material.opacity = 0.25;
    isHoldingFourth = false;
  }

  else if (isHoldingFifth) {
    synth.triggerRelease();
    noise.triggerRelease();
    fifthRing.material.color.set(tunnelColor);
    fifthRing.material.opacity = 0.25;
    isHoldingFifth = false;
  }

  else if (isHoldingSeventh) {
    synth.triggerRelease();
    noise.triggerRelease();
    seventhRing.material.color.set(tunnelColor);
    seventhRing.material.opacity = 0.25;
    isHoldingSeventh = false;
  }
});










window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([fourthRing]);

    if (intersects.length > 0) {
        const clickedOrb = intersects[0].object;
        
        if (isPlaying) {
            loopA.stop();
            loopB.stop();
            isPlaying = false;
            fourthRing.material.color.set(tunnelColor);
            fourthRing.material.opacity = 0.25;
        } else {
            loopA = new Tone.Loop((time) => {
                synth.triggerAttackRelease('F3', '8n', time);
                noise.triggerAttackRelease('8n', time);
            }, '4n').start(0);

            loopB = new Tone.Loop((time) => {
                noise.triggerAttackRelease('2n', time);
            }, '4n').start('8n');
            fourthRing.material.color.set(neutraColorPalette.paleSkyBlue);
            fourthRing.material.opacity = 0.9;
            isPlaying = true;
        }
    }
});

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([fifthRing]);

    if (intersects.length > 0) {
        const clickedOrb = intersects[0].object;
        
        if (isPlaying) {
            loopA.stop();
            loopB.stop();
            isPlaying = false;
            fifthRing.material.color.set(tunnelColor);
            fifthRing.material.opacity = 0.25;
        } else {
            loopA = new Tone.Loop((time) => {
                synth.triggerAttackRelease('G3', '8n', time);
                noise.triggerAttackRelease('8n', time);
            }, '4n').start(0);

            loopB = new Tone.Loop((time) => {
                noise.triggerAttackRelease('2n', time);
            }, '4n').start('8n');
            fifthRing.material.color.set(neutraColorPalette.paleSkyBlue);
            fifthRing.material.opacity = 0.9;
            isPlaying = true;
        }
    }
});

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([seventhRing]);

    if (intersects.length > 0) {
        const clickedOrb = intersects[0].object;
        
        if (isPlaying) {
            loopA.stop();
            loopB.stop();
            isPlaying = false;
            seventhRing.material.color.set(tunnelColor);
            seventhRing.material.opacity = 0.25;
        } else {
            loopA = new Tone.Loop((time) => {
                synth.triggerAttackRelease('Bb3', '8n', time);
                noise.triggerAttackRelease('8n', time);
            }, '4n').start(0);

            loopB = new Tone.Loop((time) => {
                noise.triggerAttackRelease('2n', time);
            }, '4n').start('8n');
            seventhRing.material.color.set(neutraColorPalette.paleSkyBlue);
            seventhRing.material.opacity = 0.9;
            isPlaying = true;
        }
    }
});

noise.volume.value = Tone.gainToDb(0.0);

Tone.getTransport().start();


//LIGHTING========================================================================================================== 

const generalLightingIntensity = 0.5;
const generalSceneLighting = new THREE.HemisphereLight(0xFFFFFF, taliesenRed, generalLightingIntensity);
scene.add(generalSceneLighting);

//STAINED GLASS TEXTURES
const textureLoader = new THREE.TextureLoader();
const stainedGlassTextureA = textureLoader.load('textures/stainedGlassA.png');
const stainedGlassTextureB = textureLoader.load('textures/OceanWave.jpeg');
const stainedGlassTextureC = textureLoader.load('textures/stainedGlassWaveB.jpg');
const stainedGlassTextureD = textureLoader.load('textures/stainedGlassD.jpg');
const sineTextureA = textureLoader.load('textures/Greydient4A_silk_3.png');

const sineTextureB = textureLoader.load('textures/Greydient4A_texture1_5.jpg');
const triangleTextureA = textureLoader.load('textures/Greydient4B_texture1_6.jpg');
const squareTextureA = textureLoader.load('textures/Greydient4C_texture1_3.jpg');

// Matcaps
const matcapA = textureLoader.load('matcaps/0_export_2.png');
const matcapB = textureLoader.load('matcaps/0_export_6.png');
const matcapC = textureLoader.load('matcaps/0_export_25.png');
const matcapd = textureLoader.load('matcaps/export_92_blur.png');

//New Texture Loader

//Overhead Spotlights
const lightAngle = Math.PI * 0.12;  
const lightPenumbra = 0.3;         
const lightDecay = 1.5;              
const lightDistance = 50; 
const lightIntensity = 5;

const orbMaterial = new THREE.MeshStandardMaterial({ 
    map: stainedGlassTextureC,
    color: 0xFFAA44,               
    emissive: 0xFF4500,          
    emissiveIntensity: 0.5,      
    transparent: false, 
    opacity: 0.7 
});

const orbGreyMaterial = new THREE.MeshStandardMaterial({ 
    color: neutraColorPalette.neutraBeige,              
    emissiveIntensity: 0.2,       
    transparent: false, 
    opacity: 1
});

const orbGeometry = new THREE.SphereGeometry(1, 32, 32);

function createLight (zPosition)
{
    const xPosition = 0;
    const yPosition = 0;
    const lightY = 10;
    const lightIntensity = lightIntensity;
    const light = new THREE.SpotLight(taliesenRed, 3.0);
    light.position.set(xPosition, lightY, zPosition);
    light.angle = lightAngle;  
    light.penumbra = lightPenumbra;         
    light.decay = lightDecay;               
    light.distance = lightDistance;          
    light.intensity = lightIntensity;    
    scene.add(light);
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(xPosition, yPosition, zPosition); 
    scene.add(lightTarget);
    light.target = lightTarget;
    const lampGeometry = new THREE.SphereGeometry(1, 32, 32);
    const lightLamp = new THREE.Mesh(lampGeometry, orbMaterial);
    lightLamp.position.set(xPosition, lightY, zPosition); 
    scene.add(lightLamp);
    const lampGreyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const lampOff = new THREE.Mesh(lampGreyGeometry, orbGreyMaterial);
    lampOff.position.set(xPosition, lightY, zPosition); 
    scene.add(lampOff);
    lampOff.visible = false;
    
    return { light, lightLamp, lampOff, lightTarget };

}

const oscOneX = 0;
const oscOneY = 0;
const oscOneZ = 15;
const oscOneLightY = 10;

const oscOnelightIntensity = 5;

const oscOneLight = new THREE.SpotLight(taliesenRed, 3.0);
oscOneLight.position.set(oscOneX, oscOneLightY, oscOneZ); 
oscOneLight.angle = lightAngle;  
oscOneLight.penumbra = lightPenumbra;         
oscOneLight.decay = lightDecay;               
oscOneLight.distance = lightDistance;         
oscOneLight.intensity = lightIntensity;    
scene.add(oscOneLight);
const oscOneLightTarget = new THREE.Object3D();
oscOneLightTarget.position.set(oscOneX, oscOneY, oscOneZ); 
scene.add(oscOneLightTarget);
oscOneLight.target = oscOneLightTarget;
const oscLampGeometry = new THREE.SphereGeometry(1, 32, 32);
const oscOneLamp = new THREE.Mesh(oscLampGeometry, orbMaterial);
oscOneLamp.position.set(oscOneX, oscOneLightY, oscOneZ); 
scene.add(oscOneLamp);

//Noise Spotlight
const noiseX = 0;
const noiseY = 0;
const noiseZ = -5;
const noiseLightY = 10;

// let noiseLight;
// noiseLight = createLight(noiseZ);

const noiseLight = new THREE.SpotLight(taliesenRed, 3.0);
noiseLight.position.set(noiseX, noiseLightY, noiseZ); 
noiseLight.angle = lightAngle;   
noiseLight.penumbra = lightPenumbra;        
noiseLight.decay = lightDecay;              
noiseLight.distance = lightDistance;          
noiseLight.intensity = lightIntensity;      
scene.add(noiseLight);
const noiseLightTarget = new THREE.Object3D();
noiseLightTarget.position.set(noiseX, noiseY, noiseZ); 
scene.add(noiseLightTarget);
noiseLight.target = noiseLightTarget;
const noiseLampGeometry = new THREE.SphereGeometry(1, 32, 32);
const noiseLamp = new THREE.Mesh(noiseLampGeometry, orbMaterial);
noiseLamp.position.set(noiseX, noiseLightY, noiseZ);
scene.add(noiseLamp);

//Filter Spotlight
const filterX = 0;
const filterY = 0;
const filterZ = -25;
const filterLightY = 10;

// let filterLight;
// filterLight = createLight(filterZ);

const filterLight = new THREE.SpotLight(taliesenRed, 3.0);
filterLight.position.set(filterX, 10, -25); 
filterLight.angle = lightAngle;  
filterLight.penumbra = lightPenumbra;        
filterLight.decay = lightDecay;               
filterLight.distance = lightDistance;           
filterLight.intensity = lightIntensity;    
scene.add(filterLight);
const filterLightTarget = new THREE.Object3D();
filterLightTarget.position.set(filterX, filterY, filterZ); 
scene.add(filterLightTarget);
filterLight.target = filterLightTarget;
const filterLampGeometry = new THREE.SphereGeometry(1, 32, 32);
const filterLamp = new THREE.Mesh(filterLampGeometry, orbMaterial);
filterLamp.position.set(filterX, filterLightY, filterZ);
scene.add(filterLamp);


//LFO Light
const lfox = 0;
const lfoY = 0;

// const lfoZ = -45;
// let lfoLight;
// lfoLight = createLight(lfoZ);

const lfoLight = new THREE.SpotLight(taliesenRed, 3.0);
lfoLight.position.set(0, 10, -45); 
lfoLight.angle = lightAngle;   
lfoLight.penumbra = lightPenumbra;          
lfoLight.decay = lightDecay;               
lfoLight.distance = lightDistance;           
lfoLight.intensity = lightIntensity;        
scene.add(lfoLight);
const lfoLightTarget = new THREE.Object3D();
lfoLightTarget.position.set(0, 0, -45); 
scene.add(lfoLightTarget);
lfoLight.target = lfoLightTarget;
const lfoLampGeometry = new THREE.SphereGeometry(1, 32, 32);
const lfoLamp = new THREE.Mesh(lfoLampGeometry, orbMaterial);
lfoLamp.position.set(0, 10, -45); 
scene.add(lfoLamp); 
lfoLamp.visible = false;   
const lfoLampOff = new THREE.Mesh(orbGeometry, orbGreyMaterial);
lfoLampOff.position.set(0, 10, -45); 
scene.add(lfoLampOff);
lfoLampOff.visible = true;  
lfoLight.intensity = 0;  

//AMP ENV LIGHT

// const envZ = -65;
// let envLight;
// envLight = createLight(envZ);

const envLight = new THREE.SpotLight(taliesenRed, 3.0);
envLight.position.set(0, 10, -65); 
envLight.angle = lightAngle;  
envLight.penumbra =  lightPenumbra;       
envLight.decay = lightDecay;             
envLight.distance = lightDistance;          
scene.add(envLight);
const envTarget = new THREE.Object3D();
envTarget.position.set(0, 0, -65);
scene.add(envTarget);
envLight.target = envTarget;
const envOrb = new THREE.Mesh(orbGeometry, orbMaterial);
envOrb.position.set(0, 10, -65); 
scene.add(envOrb);
envLight.visible = true;
envLight.intensity = 5;


//Osc Text Spotlight
const textSpotlight = new THREE.SpotLight(0xffaa33, 5); // Warm orange glow
textSpotlight.position.set(-3, 6, 20); // Right below the text
textSpotlight.angle = Math.PI / 1.5;
textSpotlight.penumbra = 0.9; // Soft edge
textSpotlight.decay = 0.2; // More natural falloff
textSpotlight.distance = 20; // Controls how far the light reaches
textSpotlight.castShadow = true; 
textSpotlight.shadow.mapSize.width = 256; // Reduce from default 2048
textSpotlight.shadow.mapSize.height = 256; 
textSpotlight.intensity = 0.3
scene.add(textSpotlight);

// const textSpotlightHelper = new THREE.SpotLightHelper(textSpotlight);
// scene.add(textSpotlightHelper);

//Noise Text Spotlight
const noiseTextSpotlight = new THREE.SpotLight(0xffaa33, 5); // Warm orange glow
noiseTextSpotlight.position.set(-3, 6, 0); // Right below the text
noiseTextSpotlight.angle = Math.PI / 1.7;
noiseTextSpotlight.penumbra = 0.7; // Soft edge
noiseTextSpotlight.decay = 0.2; // More natural falloff
noiseTextSpotlight.distance = 20; // Controls how far the light reaches
noiseTextSpotlight.castShadow = true; 
noiseTextSpotlight.shadow.mapSize.width = 256; // Reduce from default 2048
noiseTextSpotlight.shadow.mapSize.height = 256; 
noiseTextSpotlight.intensity = 0.4
scene.add(noiseTextSpotlight);

const filterTextSpotlight = new THREE.SpotLight(0xffaa33, 5); // Warm orange glow
filterTextSpotlight.position.set(-3, 6, -20); // Right below the text
filterTextSpotlight.angle = Math.PI / 1.5;
filterTextSpotlight.penumbra = 0.9; // Soft edge
filterTextSpotlight.decay = 0.2; // More natural falloff
filterTextSpotlight.distance = 20; // Controls how far the light reaches
filterTextSpotlight.castShadow = true; 
filterTextSpotlight.shadow.mapSize.width = 256; // Reduce from default 2048
filterTextSpotlight.shadow.mapSize.height = 256; 
filterTextSpotlight.intensity = 0.3
scene.add(filterTextSpotlight);


const tremoloTextSpotlight = new THREE.SpotLight(0xffaa33, 5); // Warm orange glow
tremoloTextSpotlight.position.set(-3, 6, -45); // Right below the text
tremoloTextSpotlight.angle = Math.PI / 1.5;
tremoloTextSpotlight.penumbra = 0.9; // Soft edge
tremoloTextSpotlight.decay = 0.2; // More natural falloff
tremoloTextSpotlight.distance = 20; // Controls how far the light reaches
tremoloTextSpotlight.castShadow = true; 
tremoloTextSpotlight.shadow.mapSize.width = 256; // Reduce from default 2048
tremoloTextSpotlight.shadow.mapSize.height = 256; 
tremoloTextSpotlight.intensity = 0.3
scene.add(tremoloTextSpotlight);

const adsrTextSpotlight = new THREE.SpotLight(0xffaa33, 5); // Warm orange glow
adsrTextSpotlight.position.set(-3, 6, -64); // Right below the text
adsrTextSpotlight.angle = Math.PI / 1.5;
adsrTextSpotlight.penumbra = 0.9; // Soft edge
adsrTextSpotlight.decay = 0.2; // More natural falloff
adsrTextSpotlight.distance = 20; // Controls how far the light reaches
adsrTextSpotlight.castShadow = true; 
adsrTextSpotlight.shadow.mapSize.width = 256; // Reduce from default 2048
adsrTextSpotlight.shadow.mapSize.height = 256; 
adsrTextSpotlight.intensity = 0.3
scene.add(adsrTextSpotlight);

//FOG
const desaturatedTerracotta = new THREE.Color(neutraColorPalette.terracotta).lerp(new THREE.Color(0x808080), 0.001);
scene.fog = new THREE.Fog(desaturatedTerracotta, 20, 70);
const desaturatedTunnel = new THREE.Color(tunnelColor).lerp(new THREE.Color(0x808080), 0.2);
// scene.fog = new THREE.Fog(desaturatedTunnel, 0, 70);
scene.fog = new THREE.FogExp2(desaturatedTunnel, 0.01);


//MATERIALS=========================
// ===============================================================
const commonOrangeMaterial = new THREE.MeshStandardMaterial({ color: oscillatorOneColor });
commonOrangeMaterial.roughness = 0.4;
commonOrangeMaterial.metalness = 0.1;

const textMaterial = new THREE.MeshMatcapMaterial({ color: neutraColorPalette.terracotta });

textMaterial.matcap = matcapB;
textMaterial.roughness = 0.4;
textMaterial.metalness = 0.1;

const matCapMaterialA = new THREE.MeshMatcapMaterial({ color: taliesenRed });
matCapMaterialA.matcap = matcapd;
matCapMaterialA.roughness = 0.9;
matCapMaterialA.metalness = 0.1;
// matCapMaterialA.map = stainedGlassTextureC

//TUNNEL============================================================================================
const tunnelRadius = 10;
const tunnelLength = 150;
const tunnelGeometry = new THREE.CylinderGeometry(
    tunnelRadius, 
    tunnelRadius, 
    tunnelLength, 
    32, 
    16, 
    false
);

tunnelGeometry.computeVertexNormals();

const tunnelMaterial = new THREE.MeshToonMaterial({
    map: sineTextureB,
    color: neutraColorPalette.terracotta, //or tunnelcolor
    side: THREE.BackSide,

});

const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
tunnel.rotation.x = Math.PI / 2;
tunnel.position.z = -20;
tunnel.receiveShadow = true;
tunnel.castShadow = true;
scene.add(tunnel);

//OSCILLATOR=ONE=====================================================================================================

//Sine Wave Object
function createSineWaveGeometry(width, height, depth, radius, smoothness, segments) {
    const sineWaveShape = new THREE.Shape();
    const sineEpsilon = 0.00001;
    const segmentWidth = width / segments;
    sineWaveShape.moveTo(-width / 2, 0);
    for (let i = 0; i <= segments; i++) {
        const x = -width / 2 + i * segmentWidth;
        const y = Math.sin((i / segments) * Math.PI * 2) * (height / 2);
        if (i === 0) {
            sineWaveShape.lineTo(x, y);
        } else {
            sineWaveShape.quadraticCurveTo(x - segmentWidth / 2, y, x, y);
        }
    }
    for (let i = segments; i >= 0; i--) {
        const x = -width / 2 + i * segmentWidth;
        const y = Math.sin((i / segments) * Math.PI * 2) * (height / 2);
        sineWaveShape.lineTo(x, y + sineEpsilon);
    }
    const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: true,
        bevelThickness: radius,
        bevelSize: radius,
        bevelSegments: 4
    };
    const sineGeometry = new THREE.ExtrudeGeometry(sineWaveShape, extrudeSettings);
    sineGeometry.center();
    return sineGeometry;
}

const sineWidth = 1.33, sineHeight = 0.665, sineDepth = 0.266, sineRadius = 0.0665;

const sphereGeometry = createSineWaveGeometry(
    sineWidth, sineHeight, sineDepth, sineRadius, 16, 64
);
const sineMesh = new THREE.Mesh(sphereGeometry, commonOrangeMaterial);
sineMesh.visible = true;


//Cube Object
function createRoundedCubeGeometry(width, height, depth, radius, smoothness) {
    const cubeShape = new THREE.Shape();
    const cubeEpsilon = 0.00001;
    const radius0 = radius - cubeEpsilon;
    cubeShape.moveTo(0, radius0);
    cubeShape.lineTo(0, height - radius0);
    cubeShape.quadraticCurveTo(0, height, radius0, height);
    cubeShape.lineTo(width - radius0, height);
    cubeShape.quadraticCurveTo(width, height, width, height - radius0);
    cubeShape.lineTo(width, radius0);
    cubeShape.quadraticCurveTo(width, 0, width - radius0, 0);
    cubeShape.lineTo(radius0, 0);
    cubeShape.quadraticCurveTo(0, 0, 0, radius0);

    const geometry = new THREE.ExtrudeGeometry(cubeShape, {
        depth: depth - radius * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius,
        curveSegments: smoothness
    });
    geometry.center();
    return geometry;
}

const roundedCubeGeometry = createRoundedCubeGeometry(0.8, 0.8, 0.8, 0.05, 16);
const squareMesh = new THREE.Mesh(roundedCubeGeometry, commonOrangeMaterial);
squareMesh.visible = false;

//Triangle Object
function createRoundedTriangleGeometry(width, height, depth, radius, smoothness) {
    const triangleShape = new THREE.Shape();
    const triangleEpsilon = 0.00001;
    const radius0 = radius - triangleEpsilon;
    const halfWidth = width / 2;

    triangleShape.moveTo(-halfWidth + radius0, -height / 2);
    triangleShape.lineTo(halfWidth - radius0, -height / 2);
    triangleShape.quadraticCurveTo(halfWidth, -height / 2, halfWidth, -height / 2 + radius0);
    triangleShape.lineTo(radius0, height / 2 - radius0);
    triangleShape.quadraticCurveTo(0, height / 2, -radius0, height / 2 - radius0);
    triangleShape.lineTo(-halfWidth, -height / 2 + radius0);
    triangleShape.quadraticCurveTo(-halfWidth, -height / 2, -halfWidth + radius0, -height / 2);

    const extrudeSettings = {
        steps: 1,
        depth: depth,
        bevelEnabled: true,
        bevelThickness: radius,
        bevelSize: radius,
        bevelSegments: smoothness
    };
    const geometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
    geometry.center();
    return geometry;
}

const pyramidGeometry = createRoundedTriangleGeometry(1, 0.866, 0.2, 0.05, 4);
const triangleMesh = new THREE.Mesh(pyramidGeometry, commonOrangeMaterial);
triangleMesh.visible = false;

const oscillatorGroup = new THREE.Group();
oscillatorGroup.add(sineMesh);
oscillatorGroup.add(squareMesh);
oscillatorGroup.add(triangleMesh);
oscillatorGroup.position.set(0, 0, 15);
scene.add(oscillatorGroup);


//Oscillator Selector Objects
const sineSmoothness = 16;
const sineSegments = 64;
const pyramidWidth = 1;
const pyramidHeight = 0.866; 
const pyramidDepth = 0.2;
const pyramidRadius = 0.05;
const pyramidSmoothness = 4;

const translucentMaterial = new THREE.MeshStandardMaterial({
    color: oscillatorOneColor, 
    opacity: 0.5,   
    transparent: true,
    roughness: 0.5,  
    metalness: 0.1  
});



const sphereSelectorGeometry = createSineWaveGeometry(
    sineWidth / 3, sineHeight / 3, sineDepth / 3, sineRadius / 3, sineSmoothness, sineSegments
);

const sphereSelectorMesh = new THREE.Mesh(sphereSelectorGeometry, translucentMaterial);
sphereSelectorMesh.position.set(0, sineHeight / 2 + 0.65, 15); // Center position
scene.add(sphereSelectorMesh);

const pyramidSelectorGeometry = createRoundedTriangleGeometry(
    pyramidWidth / 3, pyramidHeight / 3, pyramidDepth / 3, pyramidRadius / 3, pyramidSmoothness
);
const pyramidSelectorMesh = new THREE.Mesh(pyramidSelectorGeometry, translucentMaterial);

const cubeSelectorGeometry = createRoundedCubeGeometry(
    0.8 / 3, 0.8 / 3, 0.8 / 3, 0.05 / 3, 16
);
const cubeSelectorMesh = new THREE.Mesh(cubeSelectorGeometry, translucentMaterial);
scene.add(pyramidSelectorMesh, cubeSelectorMesh);
const spacing = 0.7; 
pyramidSelectorMesh.position.set(-spacing, sineHeight / 2 + 0.5, 15);
cubeSelectorMesh.position.set(spacing, sineHeight / 2 + 0.5, 15); 
sphereSelectorMesh.visible = true;
pyramidSelectorMesh.visible = true;
cubeSelectorMesh.visible = true;
const selectorGroup = new THREE.Group();
selectorGroup.add(sphereSelectorMesh);
selectorGroup.add(pyramidSelectorMesh);
selectorGroup.add(cubeSelectorMesh);
scene.add(selectorGroup);
let activeShape = 'sine';
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const selectors = [
    { mesh: sphereSelectorMesh, shape: 'sine' },
    { mesh: pyramidSelectorMesh, shape: 'pyramid' },
    { mesh: cubeSelectorMesh, shape: 'cube' }
];



window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([...selectors.map(s => s.mesh), oscOneLamp]);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        const selectedShape = selectors.find(s => s.mesh === clickedObject)?.shape;
        if (selectedShape) switchMainShape(selectedShape);
 
    }
});

function switchMainShape(shape) {
    if (shape === activeShape) return;

    sineMesh.visible = (shape === 'sine');
    triangleMesh.visible = (shape === 'pyramid');
    squareMesh.visible = (shape === 'cube');

    if (shape === 'sine') {
        sineMesh.visible = true;
        // tunnelMaterial.map = sineTextureB;
        tunnelMaterial.color.set(neutraColorPalette.terracotta);
        synth.oscillator.type = "sine";
    } 
    else if (shape === 'pyramid') {
        triangleMesh.visible = true;
        // tunnelMaterial.map = triangleTextureA;
        tunnelMaterial.color.set(neutraColorPalette.mutedTeal);
        synth.oscillator.type = "triangle";
    } 
    else if (shape === 'cube') {
        squareMesh.visible = true;
        // tunnelMaterial.map = squareTextureA;
        tunnelMaterial.color.set(neutraColorPalette.sunlitSand);
        synth.oscillator.type = "square";
    }

    activeShape = shape;
    const shapeIndex = shape === 'sine' ? 0 : shape === 'pyramid' ? 1 : 2;

}

// Create Three.js volume particle group
const defaultVolumeLevel = 0.15;
synth.volume.value = Tone.gainToDb(defaultVolumeLevel);

const volumeParticlesGroup = new THREE.Group();
scene.add(volumeParticlesGroup);
const volumeParticleCount = 7;
const volumeParticleSpacing = 0.2;
const volumeParticleSize = 0.05;
const volumeParticleMaterial = new THREE.MeshStandardMaterial({
    color: oscillatorOneColor,
    transparent: true,
    opacity: 0.3,
    roughness: 0.5,
    metalness: 0.1,
});

for (let i = 0; i < volumeParticleCount; i++) {
    const volumeParticleGeometry = new THREE.SphereGeometry(volumeParticleSize, 16, 16);
    const volumeParticleMesh = new THREE.Mesh(volumeParticleGeometry, volumeParticleMaterial.clone());
    volumeParticleMesh.position.set(1.5, i * volumeParticleSpacing, 15);
    volumeParticlesGroup.add(volumeParticleMesh);
}

let selectedVolumeParticle = null;
window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(volumeParticlesGroup.children);
    if (intersects.length > 0) {
        selectedVolumeParticle = intersects[0].object;
        selectedVolumeParticle.scale.set(2, 2, 2);
    }
});

window.addEventListener('mousemove', (event) => {
    if (selectedVolumeParticle) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedVolumeParticle.position.z);
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        
        const clampedY = THREE.MathUtils.clamp(point.y, 0, volumeParticleCount * volumeParticleSpacing);
        selectedVolumeParticle.position.y = clampedY;
        
        const volumeLevel = clampedY / (volumeParticleCount * volumeParticleSpacing);
        
        updateVolumeParticles(volumeLevel * 100);
        synth.volume.value = Tone.gainToDb(volumeLevel);

        selectedVolumeParticle.visible = true;
    }
});

window.addEventListener('mouseup', () => {
    selectedVolumeParticle = null;
});

function updateVolumeParticles(volumeLevel) {
    const visibleParticles = Math.round((volumeLevel / 100) * volumeParticleCount);
    
    volumeParticlesGroup.children.forEach((particle, index) => {
        particle.material.opacity = index < visibleParticles ? 1 : 0.3;
    });
}

updateVolumeParticles(15);



const oscillatorOneGroup = new THREE.Group();
oscillatorOneGroup.add(oscillatorGroup);
oscillatorOneGroup.add(selectorGroup);
oscillatorOneGroup.add(volumeParticlesGroup);
scene.add(oscillatorOneGroup);

//NOISE==============================================================================================

//Main Noise Particles
const noiseCenterX = noiseX;
const noiseCenterY = 0;
const noiseCenterZ = -5;


const noiseGrainGroup = new THREE.Group();
scene.add(noiseGrainGroup);

const grainMaterial = new THREE.MeshPhongMaterial({
    color: oscillatorOneColor,
    transparent: true,
    opacity: 0.5
});


const grainGeometry = new THREE.BoxGeometry(0.02, 0.02, 0.02);

function createGrain(noiseLevel) {
    const mesh = new THREE.Mesh(grainGeometry, orbGreyMaterial);
    const radius = 4; 

    const theta = Math.random() * Math.PI * 5;
    const phi = Math.acos(2 * Math.random() - 1);
    
    mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
    );
    
  
    mesh.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
    );
    
    return mesh;
}

function updateGrainObject(count, radius) {
    noiseGrainGroup.clear();
    for (let i = 0; i < count; i++) {
        noiseGrainGroup.add(createGrain());
    }
    console.log("Sending grain count to backend:", count);
}

noiseGrainGroup.position.set (noiseCenterX, noiseCenterY, noiseCenterZ)


updateGrainObject(500);





const noiseParticlesGroup = new THREE.Group();
scene.add(noiseParticlesGroup);
const noiseParticleCount = 7;
const noiseParticleSpacing = 0.2; 
const noiseParticleSize = .05; 
const noiseParticleMaterial = new THREE.MeshStandardMaterial({
    color: oscillatorOneColor,
    transparent: true,
    opacity: 0.3, 
    roughness: 0.5,
    metalness: 0.1,
});


for (let i = 0; i < noiseParticleCount; i++) {
    const noiseParticleGeometry = new THREE.SphereGeometry(noiseParticleSize, 16, 16);
    const noiseParticleMesh = new THREE.Mesh(noiseParticleGeometry, noiseParticleMaterial.clone()); 
    noiseParticleMesh.position.set(noiseX + 2.5, i * noiseParticleSpacing, -5); 
    noiseParticlesGroup.add(noiseParticleMesh);

}



//Noise Volume Slider
let noiseParticle = null;
window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(noiseParticlesGroup.children);
    if (intersects.length > 0) {
        noiseParticle = intersects[0].object; 
        noiseParticle.scale.set(2, 2, 2); 
    }
});



window.addEventListener('mousemove', (event) => {
    if (noiseParticle) {
     
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -noiseParticle.position.z); 
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        const clampedY = THREE.MathUtils.clamp(point.y, 0, noiseParticleCount * noiseParticleSpacing);
        noiseParticle.position.y = clampedY;
        const noiseLevel = clampedY / (noiseParticleCount * noiseParticleSpacing);
        noise.volume.value = Tone.gainToDb(noiseLevel);

        updateNoiseParticle(noiseLevel * 100); 
    }
});



window.addEventListener('mouseup', () => {
    noiseParticle = null; 
});

function updateNoiseParticle(noiseLevel) {
    const visibleNoiseParticles = Math.round((noiseLevel / 100) * noiseParticleCount);

    noiseParticlesGroup.children.forEach((particle, index) => {
    particle.material.opacity = index < visibleNoiseParticles ? 1 : 0.3;
    });
}





//FILTER

//Filter Objects
function create3DLowPassFilterCutoff(width, height, depth, radius, angle) {
    const cutoffGroup = new THREE.Group(); 

    const filterShape = new THREE.Shape();
    filterShape.moveTo(-width / 2, 0); 
    filterShape.lineTo(width / 2, 0);  

    // Angled line (cutoff slope)
    const angleRad = THREE.MathUtils.degToRad(angle);
    const xOffset = Math.cos(angleRad) * height;
    const yOffset = -Math.sin(angleRad) * height;
    filterShape.lineTo(width / 2 + xOffset, yOffset);
    filterShape.quadraticCurveTo(width / 2, 0, -width / 2, 0.2);

    const extrudeSettings = {
        steps: 10,
        depth: depth, 
        bevelEnabled: true,
        bevelThickness: radius * 3,
        bevelSize: radius,
        bevelSegments: 32, 
    };

   
    const filterGeometry = new THREE.ExtrudeGeometry(filterShape, extrudeSettings);
    filterGeometry.center(); 
    const filterMesh = new THREE.Mesh(filterGeometry, commonOrangeMaterial);
    cutoffGroup.add(filterMesh);

    
    return cutoffGroup;
}

const cutoffWidth = 2.5;       
const cutoffHeight = 2;      
const cutoffDepth = .1;     
const cutoffRadius = 0.2;   
const cutoffAngle = 30;     

const filterCutoff3DObject = create3DLowPassFilterCutoff(
    cutoffWidth,
    cutoffHeight,
    cutoffDepth,
    cutoffRadius,
    cutoffAngle
);
filterCutoff3DObject.position.set(0, 0, -26); // Adjust position as needed
scene.add(filterCutoff3DObject);

//Filter Cutoff Control
const filterParticlesGroup = new THREE.Group();
scene.add(filterParticlesGroup);
const filterParticlesCount = 7;
const filterParticlesSpacing = 0.2; 
const filterParticlesSize = .05; 
const filterParticlesMaterial = new THREE.MeshStandardMaterial({
    color: oscillatorOneColor,
    transparent: true,
    opacity: 0.3, 
    roughness: 0.5,
    metalness: 0.1,
});

for (let i = 0; i < filterParticlesCount; i++) {
    const filterParticlesGeometry = new THREE.SphereGeometry(filterParticlesSize, 16, 16);
    const filterParticleMesh = new THREE.Mesh(filterParticlesGeometry, filterParticlesMaterial.clone()); // Clone material for each particle

    filterParticleMesh.position.set(1.5, i * filterParticlesSpacing, -25); // Adjust `x`, `y`, and `z` as needed
    filterParticlesGroup.add(filterParticleMesh);
}


let selectedFilterParticle = null;
window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(filterParticlesGroup.children);
    if (intersects.length > 0) {
        selectedFilterParticle = intersects[0].object; // Select the particle
        selectedFilterParticle.scale.set(2, 2, 2); 
    }
});


window.addEventListener('mousemove', (event) => {
    if (selectedFilterParticle) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const filterPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedFilterParticle.position.z); // Plane at the particle's Z
        const filterPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(filterPlane, filterPoint);
        const clampedFilterY = THREE.MathUtils.clamp(filterPoint.y, 0, filterParticlesCount * filterParticlesSpacing);
        selectedFilterParticle.position.y = clampedFilterY;
        const filterCutoff = clampedFilterY / (filterParticlesCount * filterParticlesSpacing);
        // synth.filter.frequency.setValueAtTime(filterCutoff * 20000, Tone.now());
        updateFilterCutoff(filterCutoff * 100);
        
    }
});

window.addEventListener('mouseup', () => {
    selectedFilterParticle = null; // Release the particle
});

function updateFilterCutoff(filterCutoff) {
    const visibleFilterParticles = Math.round((filterCutoff / 100) * filterParticlesCount);

    filterParticlesGroup.children.forEach((particle, index) => {
        particle.material.opacity = index < visibleFilterParticles ? 1 : 0.3;
    });
}





//LFO

// CLICK OUTER RING - Larger Cylinder

const particleGroup = new THREE.Group(); 
const particleCount = 25; 
const ringRadius = 1.5; 

for (let i = 0; i < particleCount; i++) {
 
    const radius = ringRadius + (Math.random() - 0.5) * 0.1;
    const angle = Math.random() * Math.PI * 2;

    let geometry;
    const randomShape = Math.random();
    if (randomShape < 0.33) {
        geometry = new THREE.SphereGeometry(0.05 * Math.random() + 0.03, 8, 8);
    } else if (randomShape < 0.66) {
        geometry = new THREE.BoxGeometry(0.05 * Math.random() + 0.03, 0.05 * Math.random() + 0.03, 0.05 * Math.random() + 0.03);
    } else {
        geometry = new THREE.IcosahedronGeometry(0.05 * Math.random() + 0.03, 0);
    }


    // const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
    const particle = new THREE.Mesh(geometry, commonOrangeMaterial);


    particle.position.set(
        radius * Math.cos(angle),
        radius * Math.sin(angle),
        0
    );


    particle.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);


    particle.userData = { initialPosition: particle.position.clone(), scale: 1 };
    particleGroup.add(particle);
}

particleGroup.position.set(0, 0, -45); 
scene.add(particleGroup); 

const outerRingGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
const outerRingMaterial = new THREE.MeshStandardMaterial({ opacity: 0.0, transparent: true });
const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
outerRing.rotation.x = Math.PI / 2;  
outerRing.position.z = -45;

let isDragging = false;


function sendParameterToCpp(lfoClick)
{
    nativeFunction(['lfoOn', lfoClick])
};


function animateParticles() {
    const time = Date.now() * 0.001; 
    particleGroup.children.forEach(particle => {
        const { initialPosition, scale } = particle.userData;
        particle.position.x = initialPosition.x + Math.sin(time + particle.id) * 0.1;
        particle.position.y = initialPosition.y + Math.cos(time + particle.id) * 0.1;
        particle.scale.set(scale, scale, scale);
    });
   
}

//ADSR
const fontLoader = new FontLoader();
fontLoader.load("fonts/P22 FLLW Exhibition_Regular.json", function(font) {

    function createLetter(letter, font){
    return new TextGeometry(letter, {
        font: font,
        size: 11,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 5
    });
}
    const aGeometry = createLetter('A', font);
    const dGeometry = createLetter('D', font);
    const sGeometry = createLetter('S', font);
    const rGeometry = createLetter('R', font);


    const adsrMaterial = new THREE.MeshPhysicalMaterial

    const aMesh = new THREE.Mesh(aGeometry, textMaterial);

// //Labels
const labelSize = 0.08;
const oscWordGeometry = createLetter('OSC', font);
const oscillatorMesh = new THREE.Mesh(oscWordGeometry, labelMaterial);
oscillatorMesh.position.set(-2.7, 8, 18.4);
oscillatorMesh.scale.set(labelSize, labelSize, labelSize)
oscillatorMesh.rotation.x = Math.PI / 2; 
oscillatorMesh.castShadow = true;
oscillatorMesh.receiveShadow = true;
oscillatorMesh.transparent = true;
scene.add(oscillatorMesh);

textSpotlight.target = oscOneLamp;

const noiseWordGeometry = createLetter('Noise', font);
const noiseMesh = new THREE.Mesh(noiseWordGeometry, labelMaterial);
noiseMesh.position.set(-3.2, 8, -1.6);
noiseMesh.scale.set(labelSize, labelSize, labelSize)
noiseMesh.rotation.x = Math.PI / 2; 
noiseMesh.castShadow = true;
noiseMesh.transparent = true;
scene.add(noiseMesh);

noiseTextSpotlight.target = noiseMesh;

const filterWordGeometry = createLetter('Filter', font);
const filterWordMesh = new THREE.Mesh(filterWordGeometry, labelMaterial);
filterWordMesh.position.set(-2.9, 8, -21.6);
filterWordMesh.scale.set(labelSize, labelSize, labelSize)
filterWordMesh.rotation.x = Math.PI / 2;
filterWordMesh.castShadow = true;
filterWordMesh.transparent = true;
scene.add(filterWordMesh);

filterTextSpotlight.target = filterLamp;


const tremoloWordGeometry = createLetter('LFO', font);
const tremoloWordMesh = new THREE.Mesh(tremoloWordGeometry, labelMaterial);
tremoloWordMesh.position.set(-2.8, 7.5, -44.3);
tremoloWordMesh.scale.set(labelSize, labelSize, labelSize)
tremoloWordMesh.rotation.x = Math.PI / 2; // 90° forward tilt
tremoloWordMesh.castShadow = true;
tremoloWordMesh.transparent = true;
scene.add(tremoloWordMesh);

tremoloTextSpotlight.target = lfoLamp;

const adsrWordGeometry = createLetter('adsr', font);
const adsrWordMesh = new THREE.Mesh(adsrWordGeometry, labelMaterial);
adsrWordMesh.position.set(-3.5, 7.7, -63.7);
adsrWordMesh.scale.set(labelSize, labelSize, labelSize)
adsrWordMesh.rotation.x = Math.PI / 2; // 90° forward tilt
adsrWordMesh.castShadow = true;
adsrWordMesh.transparent = true;
scene.add(adsrWordMesh);

adsrTextSpotlight.target = envOrb;

});


//Attack Particle Group
const attackParticleGroup = new THREE.Group();
scene.add(attackParticleGroup);
const attackParticleCount = 10;
const attackParticleSpacing = 0.2; 
const attackParticleSize = .05; 
const attackParticleMaterial = new THREE.MeshStandardMaterial({
    color: commonOrangeMaterial,
    transparent: true,
    opacity: 0.3, 
    roughness: 0.5,
    metalness: 0.1,
});

for (let i = 0; i < attackParticleCount; i++) {
    const attackParticleGeometry = new THREE.SphereGeometry(attackParticleSize, 16, 16);
    const attackParticleMesh = new THREE.Mesh(attackParticleGeometry, attackParticleMaterial.clone()); // Clone material for each particle

    attackParticleMesh.position.set(-3, i * attackParticleSpacing, -65); // Adjust `x`, `y`, and `z` as needed
    attackParticleGroup.add(attackParticleMesh);
}

//Slider control

let selectedAttackParticle = null;

window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(attackParticleGroup.children);
    if (intersects.length > 0) {
        selectedAttackParticle = intersects[0].object; // Select the particle
        selectedAttackParticle.scale.set(2, 2, 2); 
    }
});


window.addEventListener('mousemove', (event) => {
    if (selectedAttackParticle) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedAttackParticle.position.z); // Plane at the particle's Z
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        const clampedY = THREE.MathUtils.clamp(point.y, 0, attackParticleCount * attackParticleSpacing);
        selectedAttackParticle.position.y = clampedY;
        const attackPercent = clampedY / (attackParticleCount * attackParticleSpacing);
        console.log(`Volume Level: ${attackPercent.toFixed(2)}`);
        synth.envelope.attack = attackPercent;
        noise.envelope.attack = attackPercent;
        updateAttackParticles(attackPercent * 100); // Scale volume to 0-100 for consistency
    }
});

window.addEventListener('mouseup', () => {
    selectedAttackParticle = null; // Release the particle
});

function updateAttackParticles(attackPercent) {
    const visibleParticles = Math.round((attackPercent / 100) * attackParticleCount);

    attackParticleGroup.children.forEach((particle, index) => {
        if (index < visibleParticles) {
            particle.material.opacity = 1; // Fully visible for active particles
        } else {
            particle.material.opacity = 0.3; // Translucent for inactive particles
        }
    });
}

updateAttackParticles(10);

//Decay Particle Group
const decayParticleGroup = new THREE.Group();
scene.add(decayParticleGroup);
const decayParticleCount = 10;
const decayParticleSpacing = 0.2; 
const decayparticleSize = .05; 
const decayParticleMaterial = new THREE.MeshStandardMaterial({
    color: commonOrangeMaterial,
    transparent: true,
    opacity: 0.3, 
    roughness: 0.5,
    metalness: 0.1,
});

for (let i = 0; i < decayParticleCount; i++) {
    const decayParticleGeometry = new THREE.SphereGeometry(decayparticleSize, 16, 16);
    const decayParticleMesh = new THREE.Mesh(decayParticleGeometry, decayParticleMaterial.clone()); // Clone material for each particle

    decayParticleMesh.position.set(-1, i * decayParticleSpacing, -65); // Adjust `x`, `y`, and `z` as needed
    decayParticleGroup.add(decayParticleMesh);
}

//Slider control
let selectedDecayParticle = null;

window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(decayParticleGroup.children);
    if (intersects.length > 0) {
        selectedDecayParticle = intersects[0].object; // Select the particle
        selectedDecayParticle.scale.set(2, 2, 2); 
    }
});


window.addEventListener('mousemove', (event) => {
    if (selectedDecayParticle) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedDecayParticle.position.z); // Plane at the particle's Z
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        const clampedY = THREE.MathUtils.clamp(point.y, 0, decayParticleCount * decayParticleSpacing);
        selectedDecayParticle.position.y = clampedY;
        const decayPercent = clampedY / (decayParticleCount * decayParticleSpacing);
        synth.envelope.decay = decayPercent;
        noise.envelope.decay = decayPercent;

        console.log(`Decay Level: ${decayPercent.toFixed(2)}`);

        updateDecayParticles(decayPercent * 100); // Scale volume to 0-100 for consistency
    }
});

window.addEventListener('mouseup', () => {
    selectedDecayParticle = null; // Release the particle
});

function updateDecayParticles(decayPercent) {
    const visibleParticles = Math.round((decayPercent / 100) * decayParticleCount);

    decayParticleGroup.children.forEach((particle, index) => {
        if (index < visibleParticles) {
            particle.material.opacity = 1; // Fully visible for active particles
        } else {
            particle.material.opacity = 0.3; // Translucent for inactive particles
        }
    });
}

updateDecayParticles(10);

//Sustain Particle Group
const sustainParticleGroup = new THREE.Group();
scene.add(sustainParticleGroup);
const sustainParticleCount = 10;
const sustainParticleSpacing = 0.2; 
const sustainParticleSize = .05; 
const sustainParticleMaterial = new THREE.MeshStandardMaterial({
    color: commonOrangeMaterial,
    transparent: true,
    opacity: 0.3, 
    roughness: 0.5,
    metalness: 0.1,
});

for (let i = 0; i < sustainParticleCount; i++) {
    const sustainParticleGeometry = new THREE.SphereGeometry(sustainParticleSize, 16, 16);
    const sustsainParticleMesh = new THREE.Mesh(sustainParticleGeometry, sustainParticleMaterial.clone()); // Clone material for each particle

    sustsainParticleMesh.position.set(1, i * sustainParticleSpacing, -65); // Adjust `x`, `y`, and `z` as needed
    sustainParticleGroup.add(sustsainParticleMesh);
}

//Slider control
let selectedSustainParticle = null;

window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(sustainParticleGroup.children);
    if (intersects.length > 0) {
        selectedSustainParticle = intersects[0].object; // Select the particle
        selectedSustainParticle.scale.set(2, 2, 2); 
    }
});


window.addEventListener('mousemove', (event) => {
    if (selectedSustainParticle) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedSustainParticle.position.z); // Plane at the particle's Z
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        const clampedY = THREE.MathUtils.clamp(point.y, 0, sustainParticleCount * sustainParticleSpacing);
        selectedSustainParticle.position.y = clampedY;
        const sustainPercent = clampedY / (sustainParticleCount * sustainParticleSpacing);
        synth.envelope.sustain = sustainPercent;
        noise.envelope.sustain = sustainPercent;
        updateSustainParticles(sustainPercent * 100); // Scale volume to 0-100 for consistency
    }
});

window.addEventListener('mouseup', () => {
    selectedSustainParticle = null; // Release the particle
});

function updateSustainParticles(sustainPercent) {
    const visibleParticles = Math.round((sustainPercent / 100) * sustainParticleCount);

    sustainParticleGroup.children.forEach((particle, index) => {
        if (index < visibleParticles) {
            particle.material.opacity = 1; // Fully visible for active particles
        } else {
            particle.material.opacity = 0.3; // Translucent for inactive particles
        }
    });
}

updateSustainParticles(10);

//Release Particle Group
const releaseParticleGroup = new THREE.Group();
scene.add(releaseParticleGroup);
const releaseParticleCount = 10;
const releaseParticleSpacing = 0.2; 
const releaseParticleSize = .05; 
const releaseParticleMaterial = new THREE.MeshStandardMaterial({
    color: commonOrangeMaterial,
    transparent: true,
    opacity: 0.3, 
    roughness: 0.5,
    metalness: 0.1,
});

for (let i = 0; i < releaseParticleCount; i++) {
    const releaseParticleGeometry = new THREE.SphereGeometry(releaseParticleSize, 16, 16);
    const releaseParticleMesh = new THREE.Mesh(releaseParticleGeometry, releaseParticleMaterial.clone()); // Clone material for each particle

    releaseParticleMesh.position.set(3, i * releaseParticleSpacing, -65); // Adjust `x`, `y`, and `z` as needed
    releaseParticleGroup.add(releaseParticleMesh);
}

//Slider control
let selectedReleaseParticle = null;

window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(releaseParticleGroup.children);
    if (intersects.length > 0) {
        selectedReleaseParticle = intersects[0].object; // Select the particle
        selectedReleaseParticle.scale.set(2, 2, 2); 
    }
});


window.addEventListener('mousemove', (event) => {
    if (selectedReleaseParticle) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -selectedReleaseParticle.position.z); // Plane at the particle's Z
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        const clampedY = THREE.MathUtils.clamp(point.y, 0, releaseParticleCount * releaseParticleSpacing);
        selectedReleaseParticle.position.y = clampedY;
        const releasePercent = clampedY / (releaseParticleCount * releaseParticleSpacing);
        synth.envelope.release = releasePercent;
        noise.envelope.release = releasePercent;
        updateReleaseParticles(releasePercent * 100); // Scale volume to 0-100 for consistency
    }
});

window.addEventListener('mouseup', () => {
    selectedReleaseParticle = null; // Release the particle
});

function updateReleaseParticles(releasePercent) {
    const visibleParticles = Math.round((releasePercent / 100) * releaseParticleCount);

    releaseParticleGroup.children.forEach((particle, index) => {
        if (index < visibleParticles) {
            particle.material.opacity = 1; // Fully visible for active particles
        } else {
            particle.material.opacity = 0.3; // Translucent for inactive particles
        }
    });
}

updateReleaseParticles(10);

// CAMERA======================================================================================================
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 45); // Start at front of the tunnel
scene.add(camera);



// RENDERER====================================================================================================
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true });
    
renderer.setSize(sizes.width, sizes.height);
// document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));


let moveForward = false;
let moveBackward = false;
let rotateLeft = false;
let rotateRight = false;
const moveSpeed = 0.2; // Speed of forward/backward movement
const rotationSpeed = 0.02; // Speed of rotation


window.addEventListener('keydown', (event) => {
    event.preventDefault();
    // if (event.shiftKey)
    // {
    switch (event.key.toLowerCase()) {
        case 'w':
            moveForward = true;
            break;
        case 's':
            moveBackward = true;
            break;
        case 'a':
            rotateLeft = true;
            break;
        case 'd':
            rotateRight = true;
            break;
    // }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            moveForward = false;
            break;
        case 's':
            moveBackward = false;
            break;
        case 'a':
            rotateLeft = false;
            break;
        case 'd':
            rotateRight = false;
            break;
    }
});


//LFO ON/Off
let isLfoGroupA = false; 
let isLfoGroupB = false;



window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(lfoLamp);
    if (intersects.length > 0) {
        isLfoGroupA = !isLfoGroupA;

       lfoLamp.visible = !lfoLamp.visible;
       lfoLampOff.visible = !lfoLampOff.visible;
       if (!isLfoGroupB) {
       
        lfoLight.intensity = lightIntensity;
      
        isLfoGroupB = true;

       }
       else {
       
        lfoLight.intensity = 0    
        isLfoGroupB = false;
       }
       
        }
    });



// OSCILLATION PARAMETERS
let oscillationAmplitude = 0.36; 
let oscillationFrequency = 0.5;  
let phaseShift = 0;
let isNoteOn = false;




// ANIMATION LOOP==============================================================================================
const movementBounds = {
    minZ: -85,
    maxZ:   45,
    radius: 9.5
  };


  function animate() {
    requestAnimationFrame(animate);

    animateParticles();

    ringGroup.position.copy(camera.position);
    ringGroup.quaternion.copy(camera.quaternion);

    if (rotateLeft) camera.rotation.y += rotationSpeed;
    if (rotateRight) camera.rotation.y -= rotationSpeed;

    // Handle forward/backward movement
    const wasdDirection = new THREE.Vector3();
    camera.getWorldDirection(wasdDirection);

    if (moveForward) {
        camera.position.add(wasdDirection.multiplyScalar(moveSpeed));
    }
    if (moveBackward) {
        camera.position.add(wasdDirection.multiplyScalar(-moveSpeed));
    }

    camera.position.z = THREE.MathUtils.clamp(camera.position.z, movementBounds.minZ, movementBounds.maxZ);

    const distanceFromCenter = Math.sqrt(camera.position.x ** 2 + camera.position.y ** 2);
    if (distanceFromCenter > movementBounds.radius) {
        const scale = movementBounds.radius / distanceFromCenter;
        camera.position.x *= scale;
        camera.position.y *= scale;
    }

    noiseGrainGroup.children.forEach(noiseGrain => {
        noiseGrain.position.add(noiseGrain.velocity);
    
        const maxRadius = 1.25; 
        if (noiseGrain.position.length() > maxRadius) {
            noiseGrain.position.normalize().multiplyScalar(maxRadius);
            noiseGrain.velocity.negate(); 
        }
    
        noiseGrain.material.opacity = 3; 
    });

    if (isNoteOn) {
        sineMesh.rotation.y += oscillationFrequency;
        triangleMesh.rotation.y += oscillationFrequency;
        squareMesh.rotation.y += oscillationFrequency;
    }
    
    renderer.render(scene, camera);
}

animate();

// RESIZE===============================================================================================
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});
