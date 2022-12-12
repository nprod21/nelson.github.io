import { Component } from '@angular/core';

@Component({
  selector: 'calc-background',
  template: `
        <div class="calc-body-shadow"></div>
        <div class="calc-body-upper-ergo-curve-shadow"></div>
        <div class="calc-body-side-ergo-shadow-left"></div>
        <div class="calc-body-side-ergo-shadow-right"></div>
        <div class="calc-body-bottom-shadow"></div>
        <div class="calc-body-side-ergo-edge-left"></div>
        <div class="calc-body-side-ergo-edge-right"></div>
        <div class="calc-body-bottom-edge"></div>
        <div class="calc-body"></div>
        <div class="calc-body-upper-ergo-curve"></div>
        <div class="calc-body-side-ergo-curve-left"></div>
        <div class="calc-body-side-ergo-curve-right"></div>
        <div class="calc-body-bottom-curve"></div>
        <div class="screen-shape"></div>
        <div class="screen-shape-low-center-filler"></div>
        <div class="screen-shape-low-tilt-left"></div>
        <div class="screen-shape-low-tilt-right"></div>
        <div class="screen-shape-circle-cutout"></div>
        `,
  styles: [`
        .calc-body-shadow {
            position: absolute;
            height: 651px;
            width: 326px;
            margin: 35px;
            border-radius: 20px;
            background-color: #313241;
            transform: translateY(14px);
            filter: blur(2px);
            opacity: 25%;
        }

        .calc-body {
            position: absolute;
            height: 651px;
            width: 326px;
            margin: 35px;
            border-radius: 20px;
            background-color: #4a5a73;
        }

        .calc-body-upper-ergo-curve-shadow {
            position: absolute;
            background-color: #313241;
            margin-top: 35px;
            margin-left: 30px;
            height: 275px;
            width: 337px;
            border-radius: 5% 5% 10% 10% / 5% 5% 50% 50% ;
            transform: translateY(14px);
            filter: blur(2px);
            opacity: 25%;
        }

        .calc-body-upper-ergo-curve {
            position: absolute;
            background-color: #4a5a73;
            margin-top: 35px;
            margin-left: 30px;
            height: 275px;
            width: 337px;
            border-radius: 5% 5% 10% 10% / 5% 5% 50% 50% ;
        }

        .calc-body-side-ergo-shadow-left, .calc-body-side-ergo-shadow-right {
            position: absolute;
            background-color: #313241;
            height: 410px;
            width: 50px;
            margin-top: 276px;
            border-radius: 15% 15% 15% 15% / 67% 67% 33% 33%;
            transform: translateY(14px);
            filter: blur(2px);
            opacity: 25%;
        }

        .calc-body-side-ergo-shadow-left {
            margin-left: 31px;
            transform: translateY(14px) translateX(-0.5px);
        }

        .calc-body-side-ergo-shadow-right {
            margin-left: 315px;
            transform: translateY(14px) translateX(0.5px);
        }

        .calc-body-bottom-shadow {
            position: absolute;
            background-color: #313241;
            width: 319.5px;
            height: 20px;
            margin-top: 676px;
            margin-left: 38px;
            border-radius: 50%;
            border-bottom-left-radius: 50%;
            border-bottom-right-radius: 50%;
            transform: translateY(14px);
            filter: blur(2px);
            opacity: 50%;    
        }
        .calc-body-side-ergo-edge-left, .calc-body-side-ergo-edge-right {
            position: absolute;
            background-color: #3b4b64;
            height: 410px;
            width: 50px;
            margin-top: 276px;
            border-radius: 15% 15% 15% 15% / 67% 67% 33% 33%;
            transform: translateY(12px);
        }

        .calc-body-side-ergo-edge-left {
            margin-left: 31px;
        }

        .calc-body-side-ergo-edge-right {
            margin-left: 315px;
        }

        .calc-body-side-ergo-curve-left, .calc-body-side-ergo-curve-right {
            position: absolute;
            background-color: #4a5a73;
            height: 410px;
            width: 50px;
            margin-top: 276px;
            border-radius: 15% 15% 15% 15% / 67% 67% 33% 33%  ;
        }

        .calc-body-side-ergo-curve-left {
            margin-left: 31px;
        }

        .calc-body-side-ergo-curve-right {
            margin-left: 315px;
        }

        .calc-body-bottom-edge {
            position: absolute;
            background-color: #3b4b64;
            width: 319.5px;
            height: 20px;
            margin-top: 676px;
            margin-left: 38px;
            border-radius: 50%;
            border-bottom-left-radius: 50%;
            border-bottom-right-radius: 50%;
            transform: translateY(12px);
        }

        .calc-body-bottom-curve {
            position: absolute;
            background-color: #4a5a73;
            width: 319.5px;
            height: 20px;
            margin-top: 676px;
            margin-left: 38px;
            border-radius: 50%;
        }

        .screen-shape {
            position: absolute;
            margin-top: 25px;
            margin-left: 41px;
            padding: 0;
            height: 215px;
            width: 315px;
            background-color: #010103;
            border-radius: 90% 90% 10% 10% / 10% 10% 75% 75% ;
        }

        .screen-shape-low-center-filler {
            position: absolute;
            margin-top: 235px;
            margin-left: 141px;
            width: 120px;
            height: 20px;
            background-color: #010103;
            border-radius: 10px;
        }

        .screen-shape-low-tilt-left, .screen-shape-low-tilt-right {
            position: absolute;
            margin-top: 230px;
            width: 111px;
            height: 20px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #010103;
        }

        .screen-shape-low-tilt-left {
            margin-left: 52px;
            transform:rotate(10deg)
        }

        .screen-shape-low-tilt-right {
            width: 113px;
            margin-left: 232px;
            transform:rotate(-10deg)
        }

        .screen-shape-circle-cutout {
            position: absolute;
            background-color: #4a5a73;
            width: 112.5px;
            height: 101.7px;
            border-radius: 60% 60% 50% 50% / 45% 45% 55% 55%;
            margin-top: 245px;
            margin-left: 141px;
        }
  `]
})

export class CalcBackgroundComponent  {}