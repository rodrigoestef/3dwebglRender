attribute vec3 aVertexPosition;
uniform mat4 uPerspectiveMat;
uniform mat4 uCameraMat;
uniform mat4 uLocationModelMat;
uniform mat4 uRotationModelMat;

void main(){
    gl_Position = uPerspectiveMat*uCameraMat*uLocationModelMat*uRotationModelMat*vec4(aVertexPosition,1.0);
}