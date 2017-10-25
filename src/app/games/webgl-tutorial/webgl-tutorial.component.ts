import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-webgl-tutorial',
  templateUrl: './webgl-tutorial.component.html',
  styleUrls: ['./webgl-tutorial.component.css']
})
export class WebglTutorialComponent implements OnInit, OnDestroy {
  
  gl: any;
  colorInterval: number;
  colorTimer: any;
  fallingBlockTimer: any;
  isAnimating: boolean;
  red: boolean;
  green: boolean;
  blue: boolean;
  blockSize: number[];
  position: number[];
  velocity: number;
  
  // frames per second
  fps: number = 60;
  
  constructor() { }

  ngOnInit() {
    
    
    var canvas: any = document.querySelector("canvas");
    
    // Set game dimensions equal to canvas width and height
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Initialize the GL context
    this.gl = canvas.getContext("webgl");
    this.gl.viewport(0,0,
      this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    
    /*
    // this.timer = Observable.timer(0,1000);
    
    // Initialize interval for 'animation' in ms
    this.colorInterval = 1000;
    
    // Only continue if WebGL is available and working
    if (!this.gl) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
    
    // set variables for falling block animation
    this.blockSize = [60,60];
    this.velocity = 3.0;
    this.position = [0, this.gl.drawingBufferHeight];
    
    // set variables for color switch 'animation'
    this.isAnimating = false;
    this.red = true;
    this.blue = true;
    this.green = true;
    
    
      
    // Enable scissoring & define the position & size of the 
    // scissoring area
    this.gl.enable(this.gl.SCISSOR_TEST);
    //this.gl.scissor(40,20,60, 130);
    */
    
    // Other tutorial
    
      // Vertex shader program
    /*
    const vsSource = `
      attribute vec4 aVertexPosition;
  
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
  
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      }
    `;
    
    const fsSource = `
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `;
    
    const shaderProgram = this.initShaderProgram(this.gl, vsSource, fsSource);

    const programInfo = {
      program: shaderProgram,
      atribLocations: {
        vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      }
    }
    */

    
  }
  
  ngOnDestroy(){
    // this.timer.unsubscribe()
  }
  
  initBuffers(gl): any {

    // Create a buffer for the square's positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the square.
  
    const positions = [
       1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
      -1.0, -1.0,
    ];
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(positions),
                  gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
    };
  }
  /* need mat4 lib (gl-matrix.js)
  drawScene(gl, programInfo, buffers): any {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
  
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
  
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
  
    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [-0.0, 0.0, -6.0]);  // amount to translate
  
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
  
    // Tell WebGL to use our program when drawing
  
    gl.useProgram(programInfo.program);
  
    // Set the shader uniforms
  
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
  
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
  */
  initShaderProgram(gl: any, vsSource: string, fsSource: string): any{
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    
    // Create shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
    
    return shaderProgram;

  }
  
  // Creates a shader of the given type, uploads the
  // source and compiles it
  loadShader(gl: any, type: any, source: any): any{
    const shader = gl.createShader(type);
    
    // Send the source to the shader object
    gl.shaderSource(shader, source);
    
    // Compile the shader program
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  
  startFallingBlockAnimation(){
    this.fallingBlockTimer = setInterval(()=>{
      this.animateFallingBlock();
    },
    17);
  }
  
  stopFallingBlockAnimation(){
    clearInterval(this.fallingBlockTimer);
  }
  
  toggleAnimation(){
    
    if(this.isAnimating){
      this.stopAnimation();
    }
    else{
      this.startColorAnimation();
    }
    
    this.isAnimating = !this.isAnimating;
    console.log(this.isAnimating);
    
  }
  
  startColorAnimation(){
    /*
    this.timer.subscribe(time => {
      console.log(time);
      this.switchColor();
    });
    */
    this.colorTimer = setInterval(()=>{ 
      this.switchColor(); 
    },
    this.colorInterval);
  }
  
  animateFallingBlock(){
    this.gl.scissor(this.position[0], this.position[1], 
                    this.blockSize[0], this.blockSize[1]);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    // every frame, the vertical position of the square is decreased
    // creates illusion of movement
    this.position[1] -= this.velocity;
    
    // when square reaches the bottom of the drawing buffer,
    // reinstatiate a 'new' square by giving it a new color
    // and resetting its position to the top & giving it a random 
    // velocity
    if(this.position[1] < 0 ) {
      
      // horizontal position (x) chosen randomly
      // vertical position (y) starts at the top of the drawing buffer
      this.position = [
        Math.random()*(this.gl.drawingBufferWidth - this.blockSize[0]),
        this.gl.drawingBufferHeight
      ];
      
      // Set random velocity between 1.0 and 7.0
      this.velocity = 1.0 + 6.0*Math.random();
      var color = this.getRandomColor();
      this.gl.clearColor(color[0], color[1], color[2], 1.0);
    }
  }
  
  stopAnimation(){
    //this.timer.unsubscribe(time);
    clearInterval(this.colorTimer);
  }
  
  // Gets and sets canvas to a random color
  switchColor(){
    
    // set color mask
    this.setColorMask();
    
    // Get random color
    var color = this.getRandomColor();
    
    // Set the clear color to the random color.
    this.gl.clearColor(color[0], color[1], color[2], 1.0);
  
    // Clear the context with the newly set color. This is
    // the function call that actually does the drawing.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  
  setColorMask(){
    this.gl.colorMask(this.red, this.green, this.blue, 1);
  }
  
  toggleRed(){
    this.red = !this.red;
    if(this.red){
      $('#red-toggle').text('On');
    }
    else{
      $('#red-toggle').text('Off');
    }
  }
  
  toggleGreen(){
    this.green = !this.green;
    if(this.green){
      $('#green-toggle').text('On');
    }
    else{
      $('#green-toggle').text('Off');
    }
  }
  
  toggleBlue(){
    this.blue = !this.blue;
    if(this.blue){
      $('#blue-toggle').text('On');
    }
    else{
      $('#blue-toggle').text('Off');
    }
    
  }
  
  // Random color generator
  getRandomColor(){
    return [Math.random(), Math.random(), Math.random()];
  }

  /* WEBGL other example */
  
  
}
