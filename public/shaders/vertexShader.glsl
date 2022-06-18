attribute vec3 aVertexPosition;
uniform mat4 uPerspectiveMat;
uniform mat4 uCameraMat;

void main(){
    gl_Position = uPerspectiveMat*uCameraMat*vec4(aVertexPosition,1.0);
}