precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aNormalPosition;
attribute vec2 aTexturePosition;
uniform mat4 uPerspectiveMat;
uniform mat4 uCameraMat;
uniform mat4 uLocationModelMat;
uniform mat4 uRotationModelMat;
varying vec4 fragNormalPosition;
varying vec2 fragTexturePosition;

void main(){
    fragTexturePosition = aTexturePosition;
    fragNormalPosition = uRotationModelMat*vec4(aNormalPosition,1.0);
    gl_Position = uPerspectiveMat*uCameraMat*uLocationModelMat*uRotationModelMat*vec4(aVertexPosition,1.0);
}